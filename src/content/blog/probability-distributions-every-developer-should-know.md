---
title: "Probability Distributions Every Developer Should Know"
description: "A practical guide to understanding and applying probability distributions in software development"
publishedAt: 2026-06-26
---

## Why Probability Distributions Matter in Software

Every software engineer encounters randomness. Whether you're simulating user behaviour, modelling system failures, A/B testing a new feature, or building a Monte Carlo simulation in a game, you're working with probability distributions. Understanding the mathematical models behind randomness transforms intuition into precision, enabling you to write code that correctly reflects the real-world phenomena you're trying to capture.

Probability distributions describe how values of a random variable are spread. They tell you which outcomes are likely, which are rare, and everything in between. This post walks through the most common distributions — discrete and continuous — with practical code examples you can use today.

## Random Variables: Discrete and Continuous

Before diving into specific distributions, it's useful to understand the two fundamental categories of random variables.

**Discrete random variables** take on a countable number of distinct values. Think of rolling a die (1 through 6) or counting the number of customer support tickets in an hour.

**Continuous random variables** can take any value within a range. Think of measuring response times in milliseconds or the exact height of a user.

The type of variable determines which probability distribution is appropriate.

## Discrete Distributions

### Uniform Distribution

The simplest distribution: every outcome has equal probability. Rolling a fair six-sided die is the canonical example.

```typescript
function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// Simulating 100,000 rolls to verify uniformity
const counts = new Array(6).fill(0);
for (let i = 0; i < 100000; i++) {
  const result = rollDie();
  counts[result - 1]++;
}
console.log(counts); // Each bucket should be ~16,666
```

The probability mass function is simply `P(X = k) = 1 / n` for `k = 1, 2, ..., n`. This distribution is your go-to whenever you need unbiased random selection — shuffling arrays, picking lottery numbers, or assigning treatment groups in an experiment.

### Bernoulli Distribution

A Bernoulli trial has exactly two outcomes: success (1) with probability `p` and failure (0) with probability `1 - p`. Every binary decision in code — a feature flag check, a coin flip, a user conversion — follows this distribution.

```typescript
function bernoulli(p: number): boolean {
  return Math.random() < p;
}

// Simulate a 10% conversion rate
const converted = bernoulli(0.1);
```

Its mean is `p` and its variance is `p(1 - p)`. Simple, yet it forms the foundation for more complex distributions.

### Binomial Distribution

The binomial distribution describes the number of successes in `n` independent Bernoulli trials, each with the same success probability `p`. If you're tracking how many users out of 1,000 click a button with a 5% click-through rate, you're dealing with a binomial distribution.

```typescript
function binomial(n: number, p: number): number {
  let successes = 0;
  for (let i = 0; i < n; i++) {
    if (Math.random() < p) successes++;
  }
  return successes;
}

// Probability of exactly 50 conversions out of 1000 with 5% CTR
function binomialPMF(k: number, n: number, p: number): number {
  // Using log-space to avoid overflow
  const logCombination = logFactorial(n) - logFactorial(k) - logFactorial(n - k);
  const logProbability = logCombination + k * Math.log(p) + (n - k) * Math.log(1 - p);
  return Math.exp(logProbability);
}

console.log(binomialPMF(50, 1000, 0.05)); // ~0.057
```

The mean is `np` and the variance is `np(1-p)`. As `n` grows large, the binomial distribution approximates the normal distribution — a connection we'll revisit.

### Poisson Distribution

The Poisson distribution models the number of events occurring in a fixed interval of time or space, given a known average rate `λ` and independent occurrences. It's the distribution of choice for queueing problems: number of emails received per hour, server requests per second, or radioactive decay events per minute.

```typescript
function poisson(lambda: number): number {
  // Knuth's algorithm
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

function poissonPMF(k: number, lambda: number): number {
  return Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k);
}

// Average of 3 requests per second
console.log(poisson(3)); // Most values will be 2, 3, or 4
```

The mean and variance of a Poisson distribution are both equal to `λ`. This property makes it easy to detect over-dispersion in real data — if the variance significantly exceeds the mean, your data likely doesn't follow a simple Poisson process.

## Continuous Distributions

### Uniform Distribution (Continuous)

The continuous uniform distribution extends the discrete version to a range `[a, b]`. Every value in the interval is equally likely.

```typescript
function uniform(a: number, b: number): number {
  return a + Math.random() * (b - a);
}
```

Its probability density function is `f(x) = 1 / (b - a)` for `a ≤ x ≤ b`. This distribution is fundamental for random number generation — virtually every random generator starts with a uniform `[0, 1)` sample and transforms it.

### Normal (Gaussian) Distribution

The normal distribution is the most important distribution in statistics. Its characteristic bell-shaped curve appears everywhere in nature and engineering: measurement errors, test scores, stock returns over short periods, and the sampling distribution of the mean (thanks to the Central Limit Theorem).

```typescript
// Box-Muller transform: convert uniform to normal
function normal(mean: number = 0, stddev: number = 1): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stddev;
}

// Generate heights with mean 170cm and stddev 7cm
function simulateHeight(): number {
  return normal(170, 7);
}
```

The probability density function is:

```
f(x) = (1 / (σ √(2π))) * exp(-(x - μ)² / (2σ²))
```

where `μ` is the mean and `σ` is the standard deviation. The **68-95-99.7 rule** states that approximately 68% of values fall within one standard deviation of the mean, 95% within two, and 99.7% within three.

The Central Limit Theorem is why the normal distribution is so pervasive: the sum (or average) of many independent random variables, regardless of their individual distributions, approaches a normal distribution as the sample size grows. This is why A/B test results, averaged metrics, and sensor readings so often look Gaussian.

### Exponential Distribution

The exponential distribution models the time between events in a Poisson process. If requests arrive at a server at a rate of `λ` per second, the waiting time between consecutive requests follows an exponential distribution with rate `λ`.

```typescript
function exponential(rate: number): number {
  return -Math.log(Math.random()) / rate;
}

// Simulate request inter-arrival times (5 requests/second on average)
function nextRequestDelay(): number {
  return exponential(5); // Returns seconds until next request
}
```

Its probability density function is `f(x) = λe^(-λx)` for `x ≥ 0`. The mean is `1/λ` and the variance is `1/λ²`. This distribution is memoryless — the probability of waiting another minute doesn't depend on how long you've already waited. This property makes it fundamental for Markov chains, queueing theory, and reliability engineering.

```typescript
// Memoryless property demonstration
function probabilityWaitLonger(t: number, rate: number): number {
  return Math.exp(-rate * t);
}

// P(wait > 2 more seconds | already waited 5 seconds) === P(wait > 2 seconds)
console.log(probabilityWaitLonger(2, 5)); // Same as starting fresh
```

## Selecting the Right Distribution

Choosing the correct distribution for your problem depends on the nature of your data:

| Data Characteristic | Suitable Distribution |
| --- | --- |
| Fixed number of trials, binary outcomes | Binomial |
| Rare events over time/space, unbounded count | Poisson |
| Measurement errors, averaged quantities | Normal |
| Time between events | Exponential |
| Equal-probability outcomes | Uniform |
| Binary single trial | Bernoulli |

## Practical Applications in Software

### Load Testing and Traffic Simulation

Generate realistic traffic patterns by modelling arrival times with a Poisson process (exponential inter-arrival times) and request sizes with a log-normal distribution:

```typescript
function simulateTrafficStream(requestsPerSecond: number, durationSeconds: number) {
  const events: number[] = [];
  let currentTime = 0;
  while (currentTime < durationSeconds) {
    currentTime += exponential(requestsPerSecond);
    if (currentTime < durationSeconds) {
      events.push(currentTime);
    }
  }
  return events;
}
```

### Anomaly Detection

Flag outliers by measuring how many standard deviations a value lies from the mean under a normal assumption:

```typescript
function isAnomaly(value: number, mean: number, stddev: number, threshold: number = 3): boolean {
  const zScore = Math.abs(value - mean) / stddev;
  return zScore > threshold;
}
```

### A/B Testing Significance

The binomial distribution directly models conversion rates, enabling significance tests without relying on approximations:

```typescript
function conversionSignificance(
  controlVisitors: number, controlConversions: number,
  variantVisitors: number, variantConversions: number
): number {
  // Two-proportion z-test
  const p1 = controlConversions / controlVisitors;
  const p2 = variantConversions / variantVisitors;
  const pooledP = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlVisitors + 1 / variantVisitors));
  const z = (p2 - p1) / se;
  return 2 * (1 - standardNormalCDF(Math.abs(z))); // p-value
}
```

## Conclusion

Probability distributions are the bridge between raw randomness and structured understanding. By matching the right distribution to your problem, you move from ad-hoc randomness to principled probabilistic modelling. The uniform distribution gives you unbiased sampling, the binomial and Poisson distributions handle event counting, the normal distribution models aggregated measurements, and the exponential distribution captures waiting times.

These distributions form the backbone of Monte Carlo simulations, statistical inference, queueing models, and machine learning algorithms. Every developer who works with uncertainty — which is to say, every developer — benefits from having these tools in their mental toolkit. The next time you call `Math.random()`, consider what distribution your data actually follows, and choose accordingly.
