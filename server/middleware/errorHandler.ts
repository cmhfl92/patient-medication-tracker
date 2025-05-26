function errorHandler(err: any, req: any, res: any, next: any) {
  console.error('🔥 Error:', err.message);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
