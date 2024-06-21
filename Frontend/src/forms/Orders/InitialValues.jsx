

export  const InitialValues =(order)=>( {
    orderName: order?.orderName || "",
    projectName: order?.projectName || "",
    projectId: order?.projectId || "",
    productName: order?.productName || "",
    provider: order?.provider || "",
    brand: order?.brand || "",
    amount: order?.amount || "",
    details: order?.details || "",
    typeOfWork: order?.typeOfWork || "",
    status: order?.status || "pendiente",
    date: order?.date || new Date().toISOString().slice(0, 10),
    area: order?.area || "",
    section: order?.section || "",
    image: order?.image || "",
  }  ) ;