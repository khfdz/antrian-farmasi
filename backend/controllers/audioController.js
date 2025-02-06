const audioFiles = require("../data/dataAudio.json");

function generateAudioSequence(params, isRecursive = false) {
  const { bell, noAntrian, type, letter, number, loket } = params;
  let sequence = [];

  if (bell) sequence.push(audioFiles.bell);

  // Tambahkan Racikan atau Non-Racikan hanya jika bukan rekursi
  if (!isRecursive) {
    sequence.push(
      type === "racikan" ? audioFiles.racikan : audioFiles.non_racikan
    );
  }

  // No Antrian setelah Racikan/Non-Racikan
  if (noAntrian) sequence.push(audioFiles.no_antrian);

  if (audioFiles[letter]) {
    sequence.push(audioFiles[letter]);
  }

  // Tangani angka khusus 100
  if (number === 100) {
    sequence.push(`/audio/100.mp3`);
  }
  // Tangani angka selain 100
  else if (number <= 9) {
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
  } else if (number > 100) {
    if (number % 100 === 0) {
      sequence.push(`/audio/${number}.mp3`);
    } else {
      const hundreds = Math.floor(number / 100) * 100;
      const remainder = number % 100;
      sequence.push(`/audio/${hundreds}.mp3`);
      sequence = sequence.concat(
        generateAudioSequence(
          {
            bell: false,
            type: "",
            noAntrian: false,
            letter: "",
            number: remainder,
            loket: "",
          },
          true
        ) // **Set isRecursive = true untuk mencegah duplikasi**
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
