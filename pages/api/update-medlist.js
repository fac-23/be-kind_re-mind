export default function handler(req, res) {
  const {
    medicationType,
    medName,
    units,
    medDose,
    medTime,
    tabCount,
    customTime,
    notes,
  } = req.body;

  console.log(req.body);
  res.status(200).json({
    medicationType,
    medName,
    medDose,
    units,
    tabCount,
    medTime,
    customTime,
    notes,
  });
}
