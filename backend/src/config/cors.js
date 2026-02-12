
/*
process.env.NODE_ENV === "production"
  ? ["https://miapp.com"]
  : ["http://localhost:5173"];
*/

const ALLOWED_ORIGINS = ["http://localhost:5173"];

export const corsOptions = {
  origin: function (origin, callback) {
    // Permitir herramientas como Postman o curl
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

