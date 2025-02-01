const audioFiles = require("../data/dataAudio.json");

function generateAudioSequence(params) {
  const { bell, noAntrian, type, letter, number, loket } = params;
  let sequence = [];

  if (bell) sequence.push(audioFiles.bell);
  if (noAntrian) sequence.push(audioFiles.no_antrian);
  sequence.push(
    type === "racikan" ? audioFiles.racikan : audioFiles.non_racikan
  );

  if (audioFiles[letter]) {
    sequence.push(audioFiles[letter]);
  }

  if (number <= 9) {
    sequence.push(`/audio/${number}.mp3`);
  } else if (number > 9 && number < 20) {
    sequence.push(`/audio/${number - 10}.mp3`);
    sequence.push(audioFiles.belas);
  } else if (number >= 20 && number < 100) {
    const tens = Math.floor(number / 10);
    const units = number % 10;
    sequence.push(`/audio/${tens}.mp3`);
    sequence.push(audioFiles.puluh);
    if (units > 0) {
      sequence.push(`/audio/${units}.mp3`);
    }
  } else if (number >= 100) {
    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;
    sequence.push(`/audio/${hundreds}.mp3`);
    sequence.push(audioFiles.ratus);
    if (remainder > 0) {
      sequence = sequence.concat(
        generateAudioSequence({
          bell: false,
          noAntrian: false,
          type: "",
          letter: "",
          number: remainder,
          loket: "",
        })
      );
    }
  }

  if (loket && audioFiles[`loket${loket}`]) {
    sequence.push(audioFiles[`loket${loket}`]);
  }

  return sequence;
}

exports.callAudio = (req, res) => {
  const { letter, number, loket, type } = req.query;

  if (!letter || !number || !loket || !type) {
    return res.status(400).json({
      error: "Missing required parameters: letter, number, loket, or type",
    });
  }

  const audioSequence = generateAudioSequence({
    bell: true,
    noAntrian: true,
    type: type,
    letter,
    number: parseInt(number, 10),
    loket,
  });

  res.json({ sequence: audioSequence });
};
