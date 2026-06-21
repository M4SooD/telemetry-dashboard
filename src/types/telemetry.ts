export interface CpuMetrics {
  readonly usagePercentage: number;
  readonly temperature: number; // Celsius
  readonly coreFrequencies: readonly number[]; // MHz
}

export interface MemoryMetrics {
  readonly totalCache: number; // MB
  readonly activeAllocation: number; // MB
  readonly gcPauses: number; // ms
}

export interface NetworkMetrics {
  readonly latency: number; // ms
  readonly packetLoss: number; // percentage
  readonly throughput: number; // Mbps
}

export interface TelemetryData {
  readonly id: string;
  readonly timestamp: number;
  readonly cpu: CpuMetrics;
  readonly memory: MemoryMetrics;
  readonly network: NetworkMetrics;
}