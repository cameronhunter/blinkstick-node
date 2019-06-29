const blinkstick = require('../../blinkstick');

function duration(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

async function main(device) {
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor('random');
  await duration(250);
  await device.setColor(0, 0, 0);
  await device.close();
}

main(blinkstick.findFirst())
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
