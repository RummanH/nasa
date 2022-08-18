const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchWithId,
} = require('../../models/launches.model');

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  return res.status(200).json({
    status: 'success',
    data: {
      launches: await getAllLaunches(skip, limit),
    },
  });
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide all values',
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  // if (launch.launchDate.toString() === "Invalid Date") {
  if (isNaN(launch.launchDate)) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Date',
    });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json({
    status: 'success',
    data: {
      launch,
    },
  });
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existLaunch = await existLaunchWithId(launchId);

  if (!existLaunch) {
    return res.status(404).json({
      status: 'fail',
      message: 'Launch Not Found!',
    });
  }

  const aborted = await abortLaunchWithId(launchId);

  if (!aborted) {
    return res.status(400).json({
      status: 'fail',
      message: 'No launch updated!',
    });
  }
  res.status(200).json({
    status: 'success',
    ok: true,
  });
}
module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
