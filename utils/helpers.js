module.exports = {
  format_dateTime: (date) => {
    // Format date as MM/DD/YYYY
    return (
      date.toLocaleString("en-US", { dateStyle: "medium" }) +
      " - " +
      date.toLocaleString("en-US", { timeStyle: "short" })
    );
  },

  format_result: (result) => {
    if (result === true) {
      return "Yes";
    } else if (result === false) {
      return "No";
    } else {
      return "N/A";
    }
  },
};
