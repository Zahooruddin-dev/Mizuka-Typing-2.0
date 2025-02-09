import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { CHAR_TOOLTIP_TITLE } from "../../../constants/Constants";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipChart,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import { red } from "@mui/material/colors";

const getFormattedLanguageLanguageName = (value) => {
  switch (value) {
    case "ENGLISH_MODE":
      return "eng";
    default:
      return "eng";
  }
};

const initialTypingTestHistory = [
  {
    wpm: 0,
    rawWpm: 0,
    time: 0,
    error: 0,
  },
];

const Stats = React.memo(({
  status,
  wpm,
  countDown,
  countDownConstant,
  statsCharCount,
  language,
  rawKeyStrokes,
  theme,
  renderResetButton,
  setIncorrectCharsCount,
  incorrectCharsCount,
}) => {
  const [roundedRawWpm, setRoundedRawWpm] = useState(0);
  const roundedWpm = Math.round(wpm);

  const [typingTestHistory, setTypingTestHistory] = useState(
    initialTypingTestHistory
  );

  const data = React.useMemo(() => 
    typingTestHistory.map((history) => ({
      wpm: history.wpm,
      rawWpm: history.rawWpm,
      time: history.time,
      error: history.error,
    }))
  , [typingTestHistory]);

  const accuracy = React.useMemo(() => 
    Math.round((statsCharCount[1] / (statsCharCount[1] + statsCharCount[2])) * 100)
  , [statsCharCount]);

  useEffect(() => {
    const worker = new Worker(
      new URL("../../../worker/calculateRawWpmWorker", import.meta.url)
    );

    worker.postMessage({ rawKeyStrokes, countDownConstant, countDown });

    worker.onmessage = function (e) {
      setRoundedRawWpm(e.data);
      worker.terminate();
    };

    return () => worker.terminate();
  }, [rawKeyStrokes, countDownConstant, countDown]);

  useEffect(() => {
    if (status === "started") {
      setTypingTestHistory(initialTypingTestHistory);
    }
  }, [status]);

  useEffect(() => {
    if (status === "started" && countDown < countDownConstant) {
      const worker = new Worker(
        new URL("../../../worker/trackHistoryWorker", import.meta.url)
      );

      const workerData = {
        countDown,
        countDownConstant,
        typingTestHistory,
        roundedWpm,
        roundedRawWpm,
        incorrectCharsCount,
      };

      worker.postMessage(workerData);

      const handleMessage = (e) => {
        const { newEntry, resetErrors } = e.data;
        setTypingTestHistory((prev) => [...prev, newEntry]);
        if (resetErrors) {
          setIncorrectCharsCount(0);
        }
      };

      worker.onmessage = handleMessage;

      return () => worker.terminate();
    }
  }, [
    countDown,
    countDownConstant,
    incorrectCharsCount,
    roundedRawWpm,
    roundedWpm,
    setIncorrectCharsCount,
    status,
    typingTestHistory
  ]);

  // Add this effect to handle audio context
  useEffect(() => {
    // Function to initialize audio
    const initializeAudio = () => {
      if (window.Howler) {
        window.Howler.ctx && window.Howler.ctx.resume();
      }
    };

    // Add event listeners for user interactions
    const userInteractions = ['click', 'keydown', 'touchstart'];
    
    userInteractions.forEach(event => {
      document.addEventListener(event, initializeAudio, { once: true });
    });

    // Cleanup
    return () => {
      userInteractions.forEach(event => {
        document.removeEventListener(event, initializeAudio);
      });
    };
  }, []);

  const renderCharStats = () => (
    <Tooltip
      title={
        <span style={{ whiteSpace: "pre-line" }}>{CHAR_TOOLTIP_TITLE}</span>
      }
    >
      <div>
        <p className="stats-title">Characters</p>
        <h2 className="stats-value">
          <span className="correct-char-stats">{statsCharCount[1]}</span>/
          <span className="incorrect-char-stats">{statsCharCount[2]}</span>/
          <span className="missing-char-stats">{statsCharCount[3]}</span>/
          <span className="correct-char-stats">{statsCharCount[4]}</span>/
          <span className="incorrect-char-stats">{statsCharCount[5]}</span>
        </h2>
      </div>
    </Tooltip>
  );

  const renderIndicator = (color) => (
    <span
      style={{ backgroundColor: color, height: "12px", width: "24px" }}
    ></span>
  );

  const CustomTooltip = React.useCallback(({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const payloadData = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            paddingInline: "8px",
            paddingBlock: "2px",
          }}
        >
          <p className="label" style={{ fontSize: "12px", fontWeight: "bold" }}>
            {`Time: ${label} s`}
          </p>
          <p className="desc tooltip">
            {renderIndicator(red[400])}
            {`Errors: ${payloadData.error}`}
          </p>
          <p className="desc tooltip">
            {renderIndicator(theme.textTypeBox)}
            {`Raw WPM: ${payloadData.rawWpm}`}
          </p>
          <p className="desc tooltip">
            {renderIndicator(theme.text)}
            {`WPM: ${payloadData.wpm}`}
          </p>
        </div>
      );
    }
    return null;
  }, [theme.text, theme.textTypeBox]);

  const renderAccuracy = () => (
    <div style={{ marginTop: "16px" }}>
      <h2 className="primary-stats-title">ACC</h2>
      <h1 className="primary-stats-value">{accuracy}%</h1>
    </div>
  );

  const renderRawKpm = () => {
    const currentWpm = Math.round(wpm); // Get the current WPM
    const accuracyPercentage = accuracy; // Assuming accuracy is already calculated as a percentage

    // Calculate effective WPM based on accuracy
    const effectiveWpm = 
      typeof currentWpm === 'number' && 
      typeof accuracyPercentage === 'number' && 
      accuracyPercentage >= 0 && accuracyPercentage <= 100
        ? Math.round(currentWpm * (accuracyPercentage / 100)) // Calculate effective WPM
        : 0; // Default to 0 if values are invalid
    
    return (
      <div>
        <p className="stats-title">WPM</p>
        <h2 className="stats-value">{effectiveWpm}</h2>
      </div>
    );
  };

  const renderLanguage = () => (
    <div>
      <p className="stats-title">Test Mode</p>
      <h2 className="stats-value">
        {getFormattedLanguageLanguageName(language)}
      </h2>
    </div>
  );

  const renderTime = () => (
    <div>
      <p className="stats-title">Time</p>
      <h2 className="stats-value">{countDownConstant} s</h2>
    </div>
  );

  const renderWpm = () => {
    const totalWpm = data.map((e) => e.wpm).reduce((a, b) => a + b, 0);
    const averageWpm = data.length > 1 ? totalWpm / (data.length - 1) : 0;
    return (
      <div>
        <h2 className="primary-stats-title">Raw WPM</h2>
        <h1 className="primary-stats-value">{Math.round(averageWpm)}</h1>
      </div>
    );
  };

  const Chart = React.useCallback(() => (
    <ResponsiveContainer
      width="100%"
      minHeight={200}
      maxHeight={200}
      height="100%"
    >
      <ComposedChart
        width="100%"
        height="100%"
        data={data.filter((d) => d.time !== 0)}
        margin={{
          top: 12,
          right: 12,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          vertical={false}
          horizontal={false}
          stroke={theme.text}
          opacity={0.15}
        />
        <XAxis
          dataKey="time"
          stroke={theme.text}
          tickMargin={10}
          opacity={0.25}
        />
        <YAxis stroke={theme.text} tickMargin={10} opacity={0.25} />
        <TooltipChart cursor content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="rawWpm"
          stroke={theme.textTypeBox}
          dot={false}
          activeDot={false}
        />
        <Line
          type="monotone"
          dataKey="wpm"
          stroke={theme.text}
          dot={false}
          activeDot={false}
        />
        <Bar dataKey="error" barSize={12} fill={`${red[400]}`} />
      </ComposedChart>
    </ResponsiveContainer>
  ), [data, theme.text, theme.textTypeBox]);

  return (
    <>
      {status !== "finished" && (
        <>
          <h3>{countDown} s</h3>
          <h3>WPM: {Math.round(wpm)}</h3>
        </>
      )}

      {status === "finished" && (
        <div className="stats-overlay">
          <section className="stats-chart">
            <section className="stats-header">
              <div>
                {renderWpm()}
                {renderAccuracy()}
              </div>
              {Chart()}
            </section>
            <section className="stats-footer">
              {renderLanguage()}
              {renderRawKpm()}
              {renderCharStats()}
              {renderTime()}
            </section>
            <section>{renderResetButton()}</section>
          </section>
        </div>
      )}
    </>
  );
});

export default Stats;
