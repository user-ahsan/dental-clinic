module.exports = {
  apps: [
    {
      name: 'dental-clinic',
      script: 'server.js',
      instances: 'max',              // Cluster mode: use all available CPU cores
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',    // Restart if memory exceeds 512MB
      max_restarts: 10,              // Prevent infinite restart loops
      min_uptime: '10s',             // App must stay up 10s before considered stable
      exp_backoff_restart_delay: 100,
      kill_timeout: 5000,            // 5s grace period for graceful shutdown
      wait_ready: true,              // Wait for ready signal before considered online
      listen_timeout: 10000,         // Time to wait for port to become available
      shutdown_with_message: true,   // Send shutdown message before killing
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        // Database connection pool limits (prevents exhaustion under concurrent load)
        DB_POOL_MAX: 20,
        DB_POOL_IDLE_TIMEOUT: 30000,
        DB_POOL_CONNECTION_TIMEOUT: 10000,
        // Redis TLS for production (set to 'true' when using cloud Redis with TLS)
        REDIS_TLS: 'true'
      }
    }
  ]
}
