const { querySQLServer } = require('../sqlService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//API for Prefield Register
exports.addPrefieldImplAdmin = async (req, res) => {
  const {
    UserID,
    ProjId,
    ClientName,
    ClientBranchName,
    ProjectName,
    ReportLocation,
    BranchOffice,
    InFieldLocation,
    PersonFacilitating,
    TeamleaderId,
    Logintude,
    Latitude,
    CapturedDate,
    CapturedTime,
    GPSPicture,
    WhatsappLocation,
    TodayRole,
    HaveTeamMember,
    EmpTitle,
    TeamMemberid,
    AllocatedVehicle,
    VehicleID
  } = req.body;

  // Server-side date
  const DateCreated = new Date().toISOString();

  // Basic validation
  if (!UserID) {
    return res.status(400).json({ error: 'UserID is required' });
  }

  try {
    const sql = `
      INSERT INTO PrefieldImplAdmin (
        UserID, ProjId, ClientName, ClientBranchName, ProjectName,
        ReportLocation, BranchOffice, InFieldLocation, PersonFacilitating, TeamleaderId,
        Logintude, Latitude, CapturedDate, CapturedTime, GPSPicture,
        WhatsappLocation, TodayRole, HaveTeamMember, EmpTitle, TeamMemberid,
        AllocatedVehicle, VehicleID, DateCreated
      ) VALUES (
        @UserID, @ProjId, @ClientName, @ClientBranchName, @ProjectName,
        @ReportLocation, @BranchOffice, @InFieldLocation, @PersonFacilitating, @TeamleaderId,
        @Logintude, @Latitude, @CapturedDate, @CapturedTime, @GPSPicture,
        @WhatsappLocation, @TodayRole, @HaveTeamMember, @EmpTitle, @TeamMemberid,
        @AllocatedVehicle, @VehicleID, @DateCreated
      )
    `;

    const params = [
      { name: 'UserID', value: UserID },
      { name: 'ProjId', value: ProjId },
      { name: 'ClientName', value: ClientName },
      { name: 'ClientBranchName', value: ClientBranchName },
      { name: 'ProjectName', value: ProjectName },
      { name: 'ReportLocation', value: ReportLocation },
      { name: 'BranchOffice', value: BranchOffice },
      { name: 'InFieldLocation', value: InFieldLocation },
      { name: 'PersonFacilitating', value: PersonFacilitating },
      { name: 'TeamleaderId', value: TeamleaderId },
      { name: 'Logintude', value: Logintude },
      { name: 'Latitude', value: Latitude },
      { name: 'CapturedDate', value: CapturedDate },
      { name: 'CapturedTime', value: CapturedTime },
      { name: 'GPSPicture', value: GPSPicture },
      { name: 'WhatsappLocation', value: WhatsappLocation },
      { name: 'TodayRole', value: TodayRole },
      { name: 'HaveTeamMember', value: HaveTeamMember },
      { name: 'EmpTitle', value: EmpTitle },
      { name: 'TeamMemberid', value: TeamMemberid },
      { name: 'AllocatedVehicle', value: AllocatedVehicle },
      { name: 'VehicleID', value: VehicleID },
      { name: 'DateCreated', value: DateCreated }
    ];

    await querySQLServer(sql, params);
    res.status(201).json({ message: 'PrefieldImplAdmin entry created successfully' });

  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Server error while inserting data' });
  }
};


// API for vehicle Register
exports.addPreFieldVehicleRegister = async (req, res) => {
  const {
    ProjId,
    UserId,
    VehicleId,
    Latitude,
    Longitude,
    UseDate,
    UseTime,
    StreetAddress,
    CurrentKM,
    PreFuelLevel,
    FuelLevelImg,
    DateCreated
  } = req.body;

  // Validate required fields
  if (!ProjId || !UserId || !VehicleId || !Latitude || !Longitude || !UseDate || !FuelLevelImg) {
    return res.status(400).json({
      error: 'ProjId, UserId, VehicleId, Latitude, Longitude, UseDate, and FuelLevelImg are required'
    });
  }

  const dateValue = DateCreated || new Date().toISOString();

  const sql = `
    INSERT INTO PreFieldVehicleRegister (
      ProjId, UserId, VehicleId, Latitude, Longitude,
      UseDate, UseTime, StreetAddress, CurrentKM,
      PreFuelLevel, FuelLevelImg, DateCreated
    ) VALUES (
      @ProjId, @UserId, @VehicleId, @Latitude, @Longitude,
      @UseDate, @UseTime, @StreetAddress, @CurrentKM,
      @PreFuelLevel, @FuelLevelImg, @DateCreated
    )
  `;

  const params = [
    { name: 'ProjId', value: ProjId },
    { name: 'UserId', value: UserId },
    { name: 'VehicleId', value: VehicleId },
    { name: 'Latitude', value: Latitude },
    { name: 'Longitude', value: Longitude },
    { name: 'UseDate', value: UseDate },
    { name: 'UseTime', value: UseTime },
    { name: 'StreetAddress', value: StreetAddress },
    { name: 'CurrentKM', value: CurrentKM },
    { name: 'PreFuelLevel', value: PreFuelLevel },
    { name: 'FuelLevelImg', value: FuelLevelImg },
    { name: 'DateCreated', value: dateValue }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Vehicle register entry saved successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Server error while saving vehicle register entry' });
  }
};
