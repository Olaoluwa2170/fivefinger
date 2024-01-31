import allowedOrigins from './allowedOrigin';

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },

  optionsSuccessStatus: 200,
};

export default corsOptions;
