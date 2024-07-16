export const InitialValues = (order) => ({
 
  projectName:order?.projectName || "",
  projectId: order?.projectId || "",
  productName: order?.productName || "",
  provider: order?.provider || "",
  brand: order?.brand || "",
  amount: order?.amount || 0,
  details: order?.details || "",
  status: order?.status || "pendiente",
  date: order?.date || new Date().toISOString().slice(0, 10),
  image: order?.image || "",
});
