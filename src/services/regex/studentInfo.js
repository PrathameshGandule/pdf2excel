function mergedJson(text) {
  const input1 = text.studentInfoText;
  const input2 = text.sem1Text;
  const input3 = text.sem2Text;
  const input4 = text.resultSummaryText;

  const studentInfo = studentInfoJSON(input1);
  const sem1 = arrayToJson(input2);
  const sem1Sorted = sem1.sort((a, b) => {
    if (typeof a.key1 !== "number" || typeof b.key1 !== "number") {
      return 0;
    }
    return a.key1 - b.key1;
  });
  const sem1Renamed = renameKeysSequentially1(sem1Sorted);
  const sem1SingleObject = convertToSingleObject(sem1Renamed);

  const sem2 = arrayToJson(input3);
  const sem2Sorted = sem2.sort((a, b) => {
    if (typeof a.key1 !== "number" || typeof b.key1 !== "number") {
      return 0;
    }
    return a.key1 - b.key1;
  });
  const sem2Renamed = renameKeysSequentially2(sem2Sorted);
  const sem2SingleObject = convertToSingleObject(sem2Renamed);

  const resultSummary = resultSummaryToJson(input4);

  const output = {
    ...studentInfo,
    ...sem1SingleObject,
    ...sem2SingleObject,
    ...resultSummary,
  };
  return output;
}

function studentInfoJSON(text) {
  text = text.replace(/\s+/g, " ");
  const regex =
    /SEAT\s+NO\.\s*:\s*([A-Z0-9]+)\s+NAME\s*:\s*([^]+?)\s+MOTHER\s*:\s*([^]+?)\s+PRN\s*:\s*([A-Z0-9]+)\s+CLG\.\s*:\s*([^]+?\])\s*$/;

  const match = text.match(regex);

  if (!match) {
    return {
      seat_no: "Not found",
      prn_no: "Not found",
      name: "Not found",
      mother_name: "Not found",
      college: "Not found",
    };
  }

  const [, seat_no, name, mother_name, prn_no, college] = match;

  const studentInfo = {
    seat_no,
    prn_no,
    name,
    mother_name,
    college,
  };

  return studentInfo;
}

function arrayToJson(array) {
  const newArray = array.map((string) => {
    return stringToJson(string);
  });
  const sortedArray = newArray.sort((a, b) => {
    return a.key1 - b.key1;
  });
  return sortedArray;
}

function stringToJson(inputString) {
  const removedStar = inputString.replace(/\*|\s/g, " ");
  const matches = removedStar.match(
    /(\d{5,6})\s+(\S+(?:\s+\S+)*)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)/
  );

  if (!matches) {
    return null; 
  }

  const keys = [
    "key1",
    "key2",
    "key3",
    "key4",
    "key5",
    "key6",
    "key7",
    "key8",
    "key9",
    "key10",
    "key11",
    "key12",
    "key13",
    "key14",
    "key15",
  ];

  const result = {};
  for (let i = 1; i < matches.length; i++) {
    result[keys[i - 1]] = matches[i].trim() === "---" ? "---" : matches[i];
  }
  if (result === null) {
    return {
      key1: "Not found",
      key2: "Not found",
      key3: "Not found",
      key4: "Not found",
      key5: "Not found",
      key6: "Not found",
      key7: "Not found",
      key8: "Not found",
      key9: "Not found",
      key10: "Not found",
      key11: "Not found",
      key12: "Not found",
      key13: "Not found",
      key14: "Not found",
      key15: "Not found",
    };
  }
  return result;
}

function resultSummaryToJson(inputString) {
  const pattern =
    /FIRST\s+YEAR\s+SGPA\s+:\s+(\S+),\s+TOTAL\s+CREDITS\s+EARNED\s+:\s+(\d+)/;
  const match = inputString.match(pattern);

  if (match) {
    const sgpa = match[1] === "--" ? "--" : parseFloat(match[1]);
    const totalCredits = parseInt(match[2]);
    return { sgpa, total_credits: totalCredits };
  } else {
    // Handle the case when the pattern doesn't match
    return { sgpa: "Not Found", total_credits: "Not Found" };
  }
}

function renameKeysSequentially1(arrayOfObjects) {
  let counter = 1;
  let updatedArray = [];
  for (let i = 0; i < arrayOfObjects.length; i++) {
    let updatedObject = {};
    for (let key in arrayOfObjects[i]) {
      if (arrayOfObjects[i].hasOwnProperty(key)) {
        updatedObject["sem1-" + counter] = arrayOfObjects[i][key];
        counter++;
      }
    }
    updatedArray.push(updatedObject);
  }
  return updatedArray;
}

function renameKeysSequentially2(arrayOfObjects) {
  let counter = 1
  let updatedArray = [];
  for (let i = 0; i < arrayOfObjects.length; i++) {
    let updatedObject = {};
    for (let key in arrayOfObjects[i]) {
      if (arrayOfObjects[i].hasOwnProperty(key)) {
        updatedObject["sem2-" + counter] = arrayOfObjects[i][key];
        counter++;
      }
    }
    updatedArray.push(updatedObject);
  }
  return updatedArray;
}

function convertToSingleObject(arrayOfObjects) {
  let newObject = {};
  for (let i = 0; i < arrayOfObjects.length; i++) {
    for (const [key, value] of Object.entries(arrayOfObjects[i])) {
      if (newObject[key]) {
        if (!Array.isArray(newObject[key])) {
          newObject[key] = [newObject[key]];
        }
        newObject[key].push(value);
      } else {
        newObject[key] = value;
      }
    }
  }
  return newObject;
}

module.exports = mergedJson;
