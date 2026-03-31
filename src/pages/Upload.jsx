import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, RefreshCw, AlertTriangle, CheckCircle, ImagePlus, Clock } from 'lucide-react';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import PageHeader from '../components/ui/PageHeader';
import SolarLoader from '../components/ui/SolarLoader';
import clsx from 'clsx';

const recentScans = [
  { id: 1, name: 'Sector 04 – Panel A2', time: '2 hours ago', status: 'healthy' },
  { id: 2, name: 'Sector 02 – Array B',  time: '5 hours ago', status: 'warning' },
];

export default function Upload() {
  const { status, result, preview, analyze, reset } = useImageAnalysis();

  const onDrop = useCallback(files => {
    if (files[0]) analyze(files[0]);
  }, [analyze]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg','.jpeg','.png','.webp'] },
    maxFiles: 1,
    disabled: status !== 'idle',
  });

  const isIdle    = status === 'idle';
  const isLoading = status === 'uploading' || status === 'analyzing';
  const isDone    = status === 'done';
  const isClean   = result?.status === 'clean';

  const severityColors = {
    moderate: { text: 'text-status-yellow', bg: 'bg-status-yellowBg', border: 'border-status-yellowBorder' },
    high:     { text: 'text-status-red',    bg: 'bg-status-redBg',    border: 'border-status-redBorder'    },
    critical: { text: 'text-status-red',    bg: 'bg-status-redBg',    border: 'border-status-redBorder'    },
  };
  const sc = result?.severity ? severityColors[result.severity] : null;

  return (
    <div className="animate-fade-in">
      <PageHeader
        sectionLabel="AI Analysis"
        title="Health Assessment"
        description="Deep-scan your photovoltaic infrastructure using computer vision to detect efficiency bottlenecks."
      >
        <button onClick={reset} className="s-btn-secondary text-sm">
          Upload New Image
        </button>
        {isDone && (
          <button className="s-btn-primary text-sm">
            Run Analysis
          </button>
        )}
      </PageHeader>

      <div className="grid lg:grid-cols-[1fr_300px] gap-5">

        {/* ── Left column ── */}
        <div className="space-y-5">

          {/* Drop zone */}
          {isIdle && (
            <div
              {...getRootProps()}
              className={clsx(
                'rounded-xl border-2 border-dashed p-14 text-center cursor-pointer transition-all duration-200',
                isDragActive
                  ? 'border-primary bg-primary-light'
                  : 'border-border hover:border-primary-300 hover:bg-primary-50 bg-surface'
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-3">
                <div className={clsx(
                  'w-16 h-16 rounded-full flex items-center justify-center transition-colors',
                  isDragActive ? 'bg-primary text-white' : 'bg-primary-light text-primary'
                )}>
                  {isDragActive
                    ? <ImagePlus size={28} />
                    : <UploadIcon size={28} />
                  }
                </div>
                <div>
                  <p className="text-base font-bold text-ink-900 mb-1">
                    {isDragActive ? 'Drop panel imagery here' : 'Drop panel imagery here'}
                  </p>
                  <p className="text-sm text-ink-400">
                    Supports high-resolution RAW, JPG, or PNG from drone or thermal cameras.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="s-card p-6">
              {preview && (
                <div className="rounded-lg overflow-hidden mb-5 h-52 relative">
                  <img src={preview} alt="Analyzing" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-ink-900/40 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-ink-900/60 px-3 py-1.5 rounded-full">
                      {status === 'uploading' ? '📤 Uploading...' : '🔍 Scanning...'}
                    </span>
                  </div>
                </div>
              )}
              <SolarLoader
                message={status === 'uploading' ? 'Uploading imagery...' : 'Running AI analysis...'}
                sub="Computer vision model processing"
              />
            </div>
          )}

          {/* Thermal comparison (shown after analysis) */}
          {isDone && preview && (
            <div className="s-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-ink-900">Thermal Comparison View</h3>
                <div className="flex rounded-lg border border-border overflow-hidden text-xs">
                  <button className="px-3 py-1.5 bg-surface text-ink-700 font-semibold border-r border-border hover:bg-page">Overlay</button>
                  <button className="px-3 py-1.5 bg-page text-ink-500 hover:bg-surface">Side-by-Side</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="s-label mb-2">Original Spectrum</p>
                  <div className="rounded-lg overflow-hidden h-40 bg-slate-800">
                    <img src={preview} alt="Original" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <p className="s-label mb-2 text-primary">Detected Anomalies</p>
                  <div className="rounded-lg overflow-hidden h-40 bg-gradient-to-br from-slate-900 to-orange-900 relative flex items-center justify-center">
                    {/* Simulated thermal overlay */}
                    <div className="absolute inset-0 opacity-60"
                      style={{ background: 'radial-gradient(ellipse at 60% 50%, #ef4444 0%, #f97316 25%, #0f172a 70%)' }} />
                    {!isClean && (
                      <span className="relative z-10 text-white text-xs font-bold bg-status-red/80 px-2 py-1 rounded-md">
                        {result?.dirtLabel ?? 'Anomaly'}
                      </span>
                    )}
                    {isClean && (
                      <span className="relative z-10 text-white text-xs font-bold bg-status-green/80 px-2 py-1 rounded-md">
                        ✓ Clean
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right column ── */}
        <div className="space-y-4">

          {/* Current Status */}
          <div className="s-card p-5">
            <p className="s-label mb-2">Current Status</p>
            {!isDone && !isLoading && (
              <p className="text-sm text-ink-400">Upload an image to see analysis results.</p>
            )}
            {isLoading && (
              <p className="text-sm text-ink-500 font-medium animate-pulse">Analyzing…</p>
            )}
            {isDone && result && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  {isClean
                    ? <CheckCircle size={20} className="text-status-green" />
                    : <AlertTriangle size={20} className="text-status-red" />
                  }
                  <span className={clsx(
                    'text-xl font-extrabold',
                    isClean ? 'text-ink-900' : 'text-status-red'
                  )}>
                    {isClean ? 'Clean' : `Dirty (${result.dirtLabel?.split(' ')[0] ?? 'Dust'})`}
                  </span>
                </div>

                {!isClean && (
                  <div className={clsx('rounded-lg p-3 border mb-4', sc?.bg, sc?.border)}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink-600">Efficiency Loss</span>
                      <span className={clsx('text-xl font-extrabold', sc?.text)}>
                        {result.efficiencyLoss}%
                      </span>
                    </div>
                    <div className="s-progress mt-2">
                      <div
                        className="h-full rounded-full bg-status-red transition-all duration-700"
                        style={{ width: `${result.efficiencyLoss}%` }}
                      />
                    </div>
                  </div>
                )}

                {isClean && (
                  <div className="rounded-lg p-3 bg-status-greenBg border border-status-greenBorder mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink-600">Panel Efficiency</span>
                      <span className="text-xl font-extrabold text-status-green">{result.efficiency}%</span>
                    </div>
                  </div>
                )}

                {/* Meta rows */}
                <div className="space-y-2.5 text-sm">
                  {!isClean && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-ink-400">Detected Particle Density</span>
                        <span className={clsx('font-bold', sc?.text)}>
                          {result.severity === 'critical' ? 'Very High' : result.severity === 'high' ? 'High' : 'Medium'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-ink-400">Cleaning Priority</span>
                        <span className={clsx('font-bold', sc?.text)}>
                          {result.severity === 'critical' ? 'Critical' : result.severity === 'high' ? 'Urgent' : 'Moderate'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-ink-400">Estimated ROI Gain</span>
                        <span className="font-bold text-status-green">
                          +${Math.round(result.efficiencyLoss * 17)} /mo
                        </span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-ink-400">Confidence</span>
                    <span className="font-bold text-ink-800">{result.confidence}%</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* AI Optimization Tip */}
          {isDone && !isClean && (
            <div className="rounded-xl p-5 bg-primary text-white">
              <h3 className="text-sm font-bold mb-2">AI Optimization Tip</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                {result?.dirtType === 'bird_droppings'
                  ? 'Bird dropping patterns indicate a roosting location nearby. Installing deterrents could reduce recurrence by 70%.'
                  : result?.dirtType === 'heavy_soiling'
                  ? 'Heavy soiling suggests inadequate tilt angle for self-cleaning. Adjusting to 15° could improve run-off by 40%.'
                  : 'Current dust patterns suggest wind-blown silt. Installing a localized windbreak could reduce cleaning frequency by 30%.'}
              </p>
              <button className="text-2xs font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors">
                Schedule Maintenance →
              </button>
            </div>
          )}

          {/* Recent Scans */}
          <div className="s-card p-5">
            <p className="s-label mb-3">Recent Scans</p>
            <div className="space-y-2">
              {recentScans.map(scan => (
                <div key={scan.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-page transition-colors cursor-pointer">
                  {scan.status === 'healthy'
                    ? <CheckCircle size={16} className="text-status-green shrink-0" />
                    : <AlertTriangle size={16} className="text-status-red shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-ink-800 truncate">{scan.name}</p>
                    <p className="text-2xs text-ink-400 flex items-center gap-1 mt-0.5">
                      <Clock size={9} />
                      {scan.time} · {scan.status === 'healthy' ? 'Healthy' : 'High Heat'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isDone && (
            <button onClick={reset} className="s-btn-secondary w-full justify-center gap-2">
              <RefreshCw size={14} /> Analyze Another Panel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}