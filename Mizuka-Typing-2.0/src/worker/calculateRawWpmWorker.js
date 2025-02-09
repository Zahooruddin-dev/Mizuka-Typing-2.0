// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  try {
    const { rawKeyStrokes, countDownConstant, countDown } = e.data;
    
    // Validate inputs
    if (typeof rawKeyStrokes !== 'number' || rawKeyStrokes < 0) {
      throw new Error('Invalid keystrokes value');
    }
    if (typeof countDownConstant !== 'number' || typeof countDown !== 'number') {
      throw new Error('Invalid time values');
    }

    // Calculate elapsed time in minutes, prevent division by zero
    const elapsedTimeMinutes = Math.max((countDownConstant - countDown) / 60.0, 0.016); // Minimum 1 second

    // Calculate raw WPM (5 characters = 1 word)
    const rawWpm = (rawKeyStrokes / 5) / elapsedTimeMinutes;
    
    // Round to 2 decimal places for consistency
    const roundedRawWpm = Math.round(rawWpm * 100) / 100;

    postMessage({ success: true, wpm: roundedRawWpm });
  } catch (error) {
    postMessage({ success: false, error: error.message });
  }
};