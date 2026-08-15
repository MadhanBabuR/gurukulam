const FUNDRAISE_RAISED = 500000; // PLACEHOLDER VALUE — replace with real amount (INR) before launch
const FUNDRAISE_GOAL = 10000000; // PLACEHOLDER VALUE — replace with real goal (INR) before launch

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function initFundraiseBar() {
  const fill = document.getElementById('fundraise-bar-fill');
  const raisedLabel = document.getElementById('fundraise-raised-label');
  const goalLabel = document.getElementById('fundraise-goal-label');
  const percentValue = document.getElementById('fundraise-percent-value');
  if (!fill || !raisedLabel || !goalLabel) return;

  const percent = FUNDRAISE_GOAL > 0
    ? Math.min(100, Math.round((FUNDRAISE_RAISED / FUNDRAISE_GOAL) * 100))
    : 0;

  raisedLabel.textContent = `Raised: ${formatINR(FUNDRAISE_RAISED)}`;
  goalLabel.textContent = `Goal: ${formatINR(FUNDRAISE_GOAL)}`;
  fill.style.width = `${percent}%`;
  if (percentValue) percentValue.textContent = String(percent);
}

document.addEventListener('DOMContentLoaded', initFundraiseBar);
