import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading...",
  className = ""
}) => (
  <div className={`flex items-center justify-center py-12 ${className}`}>
    <div className="flex items-center gap-3 text-blue-600">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span className="text-sm font-medium">{message}</span>
    </div>
  </div>
);

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  isRetrying?: boolean;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  error, 
  onRetry, 
  isRetrying = false,
  className = ""
}) => (
  <div className={`space-y-6 ${className}`}>
    {/* Error State */}
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-800">
              Unable to Load Data
            </h3>
            <p className="text-sm text-red-600 max-w-md mx-auto">
              {error}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onRetry}
              disabled={isRetrying}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Helpful Tips */}
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
            <Wifi className="h-4 w-4 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800">Troubleshooting Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Verify the server is running</li>
              <li>• Try refreshing the page</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

interface EmptyStateProps {
  title?: string;
  description?: string;
  onRefresh?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "No Data Found",
  description = "There is currently no data available to display. This might be a temporary issue.",
  onRefresh,
  className = ""
}) => (
  <div className={`space-y-6 ${className}`}>
    <Card className="border-gray-200">
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="p-4 bg-gray-100 rounded-full">
              <WifiOff className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {title}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {description}
            </p>
          </div>

          {onRefresh && (
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={onRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);