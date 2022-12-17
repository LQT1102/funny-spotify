const formatCurrency = (value: string = "0") => {
  try {
    return (+value).toLocaleString('en-US');
  } catch (error) {
    console.error(error);
    return "0";
  }
}

export {formatCurrency}