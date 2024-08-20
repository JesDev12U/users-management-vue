export default {
  e400: (req, res, message) => res.status(400).json({ error: true, message }),
  e401: (req, res, message) => res.status(401).json({ error: true, message }),
  e403: (req, res, message) => res.status(403).json({ error: true, message }),
  e404: (req, res, message) => res.status(404).json({ error: true, message }),
  e500: (req, res, message) => res.status(500).json({ error: true, message }),
};
