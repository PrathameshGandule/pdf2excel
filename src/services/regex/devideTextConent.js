function devideText(completeText){
  const studentInfoText = extractStudentInfoText(completeText);
  const sem1Text = extractSem1Text(completeText);
  const sem2Text = extractSem2Text(completeText);
  const resultSummaryText = extractResultSummaryText(completeText);
  return {
      studentInfoText,
      sem1Text,
      sem2Text,
      resultSummaryText
  };
}

function extractStudentInfoText(completeText){
  const regex = /PAGE\s+:-\s+\d+\s+SAVITRIBAI\s+PHULE\s+PUNE\s+UNIVERSITY[^]*?CLG\.\s*:\s*DYPIT\[24\]/;
  const match = completeText.match(regex);

  if (match) {
    return match[0];
  } else {
    return 'No match found';
  }
}

function extractSem1Text(completeText) {
  const regex = /\b\d{6}\b[\s\S]*?(?=\bSEM\b)/g;
  const matches = completeText.match(regex);
  if (matches) {
      const extractedText = matches[0].slice(0, matches[0].lastIndexOf('SEM'));
      const arrayOfStrings = splitIntoArrayOfStrings(extractedText);
      return arrayOfStrings;
  } else {
      return 'No match found.';
  }
}

function extractSem2Text(completeText) {
  const regex = /SEM.:2[\s\S]*?(?=FIRST)/g;
  const matches = completeText.match(regex);
  if (matches) {
      const extractedText = matches[0].slice(6, matches[0].lastIndexOf('FIRST')).trim();
      const arrayOfStrings = splitIntoArrayOfStrings(extractedText);
      return arrayOfStrings;
  } else {
      return 'No match found.';
  }
}

function extractResultSummaryText(longText) {
  const regex = /FIRST[\s\S]*?\.{5,}/g;
  const matches = longText.match(regex);
  if (matches) {
      const startIndex = longText.indexOf(matches[0]);
      const endIndex = longText.indexOf('.....', startIndex);
      const extractedText = longText.substring(startIndex, endIndex).trim();
      return extractedText;
  } else {
      return 'No match found.';
  }
}

function splitIntoArrayOfStrings(text) {
  const pattern = /\b\d{5,6}\b/g;
  return text.match(new RegExp(`${pattern.source}.+?(?=${pattern.source}|$)`, 'g'));
}

module.exports = devideText;

