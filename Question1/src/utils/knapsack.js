export function knapsack(tasks, budget) {
  const n = tasks.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(budget + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const duration = tasks[i - 1].duration;
    const score = tasks[i - 1].impactScore;

    for (let w = 0; w <= budget; w++) {
      dp[i][w] = dp[i - 1][w];

      if (duration <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          score + dp[i - 1][w - duration]
        );
      }
    }
  }

  let w = budget;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(tasks[i - 1]);
      w -= tasks[i - 1].duration;
    }
  }

  return {
    maxImpactScore: dp[n][budget],
    selectedTasks: selected.reverse(),
  };
}