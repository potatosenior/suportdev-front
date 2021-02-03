const dateParser = date => {
  console.log(date);
  date = Date(date);
  console.log(date, typeof date);
  let parsedDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth() + 1}-${
    date.getDate() + 1 < 10 ? "0" : ""
  }${date.getDate()}`;
  console.log(parsedDate);

  return parsedDate;
};

export default dateParser;
