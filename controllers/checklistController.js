const { querySQLServer } = require('../sqlService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//API for document checklist
exports.addDocumentChecklist = async (req, res) => {
  const {
    UserId,
    ProjId,
    DocumentId,
    HaveDocument,
    Reason,
    Quantity
  } = req.body;

  // Basic required field validation
  if (!UserId || !ProjId || !DocumentId) {
    return res.status(400).json({ error: 'UserId, ProjId, and DocumentId are required' });
  }

  const DateCreated = new Date().toISOString();

  try {
    const sql = `
      INSERT INTO DocumentCheckListTable (
        UserId, ProjId, DocumentId, HaveDocument, Reason, Quantity, DateCreated
      ) VALUES (
        @UserId, @ProjId, @DocumentId, @HaveDocument, @Reason, @Quantity, @DateCreated
      )
    `;

    const params = [
      { name: 'UserId', value: UserId },
      { name: 'ProjId', value: ProjId },
      { name: 'DocumentId', value: DocumentId },
      { name: 'HaveDocument', value: HaveDocument },
      { name: 'Reason', value: Reason },
      { name: 'Quantity', value: Quantity },
      { name: 'DateCreated', value: DateCreated }
    ];

    await querySQLServer(sql, params);

    res.status(201).json({ message: 'Document checklist item added successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Server error while inserting checklist item' });
  }
};

//API for Working tool checklist 
exports.addMpsToolKitChecklist = async (req, res) => {
  const {
    UserId,
    ProjId,
    ToolKitId,
    HaveToolKit,
    Reason,
    Confirmed,
    Quantity
  } = req.body;

  if (!UserId || !ProjId || !ToolKitId) {
    return res.status(400).json({ error: 'UserId, ProjId, and ToolKitId are required' });
  }

  const DateCreated = new Date().toISOString();

  const sql = `
    INSERT INTO MpsToolKitCheckListTable (
      UserId, ProjId, ToolKitId, HaveToolKit, Reason,
      Confirmed, Quantity, DateCreated
    ) VALUES (
      @UserId, @ProjId, @ToolKitId, @HaveToolKit, @Reason,
      @Confirmed, @Quantity, @DateCreated
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'ToolKitId', value: ToolKitId },
    { name: 'HaveToolKit', value: HaveToolKit },
    { name: 'Reason', value: Reason },
    { name: 'Confirmed', value: Confirmed },
    { name: 'Quantity', value: Quantity },
    { name: 'DateCreated', value: DateCreated }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'ToolKit checklist added successfully' });
  } catch (err) {
    console.error('Checklist insert error:', err);
    res.status(500).json({ error: 'Server error while inserting checklist data' });
  }
};

//API for MPS tool kit charger 
exports.addWorkingToolImage = async (req, res) => {
  const {
    UserId,
    ProjId,
    WorkingToolChkId,
    ItemUrl
  } = req.body;

  // Required fields check
  if (!UserId || !ProjId || !WorkingToolChkId) {
    return res.status(400).json({
      error: 'UserId, ProjId, and WorkingToolChkId are required'
    });
  }

  const sql = `
    INSERT INTO WorkingToolImgTable (
      UserId, ProjId, WorkingToolChkId, ItemUrl
    ) VALUES (
      @UserId, @ProjId, @WorkingToolChkId, @ItemUrl
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'WorkingToolChkId', value: WorkingToolChkId },
    { name: 'ItemUrl', value: ItemUrl }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Working tool image added successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Server error while saving image data' });
  }
};



//API for Pos Material checklist
exports.addPosMaterialChecklist = async (req, res) => {
  const {
    UserId,
    ProjId,
    PosMaterialId,
    PosMaterialType,
    PosMaterialSubType,
    PosMaterialTool,
    Reason,
    Quantity,
    DateCreated
  } = req.body;

  if (!UserId || !ProjId || !PosMaterialId || !PosMaterialType || !PosMaterialSubType) {
    return res.status(400).json({
      error: 'UserId, ProjId, PosMaterialId, PosMaterialType, and PosMaterialSubType are required'
    });
  }

  const timestamp = DateCreated || new Date().toISOString();

  const sql = `
    INSERT INTO PosMaterialCheckListTable (
      UserId, ProjId, PosMaterialId, PosMaterialType, PosMaterialSubType,
      PosMaterialTool, Reason, Quantity, DateCreated
    ) VALUES (
      @UserId, @ProjId, @PosMaterialId, @PosMaterialType, @PosMaterialSubType,
      @PosMaterialTool, @Reason, @Quantity, @DateCreated
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'PosMaterialId', value: PosMaterialId },
    { name: 'PosMaterialType', value: PosMaterialType },
    { name: 'PosMaterialSubType', value: PosMaterialSubType },
    { name: 'PosMaterialTool', value: PosMaterialTool },
    { name: 'Reason', value: Reason },
    { name: 'Quantity', value: Quantity },
    { name: 'DateCreated', value: timestamp }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'POS material checklist item added successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Error saving checklist data' });
  }
};

//API for Pos Material Images
exports.addPosMaterialImage = async (req, res) => {
  const {
    UserId,
    ProjId,
    PosMaterialChkId,
    ItemUrl
  } = req.body;

  if (!UserId || !ProjId || !PosMaterialChkId) {
    return res.status(400).json({
      error: 'UserId, ProjId, and PosMaterialChkId are required'
    });
  }

  const sql = `
    INSERT INTO PosMaterialImgTable (
      UserId, ProjId, PosMaterialChkId, ItemUrl
    ) VALUES (
      @UserId, @ProjId, @PosMaterialChkId, @ItemUrl
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'PosMaterialChkId', value: PosMaterialChkId },
    { name: 'ItemUrl', value: ItemUrl }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'POS material image uploaded successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Error saving image data' });
  }
};

//API for Pos Installation Consumables Images
exports.addPosInstallChecklist = async (req, res) => {
  const {
    UserId,
    ProjId,
    PosInstallId,
    HavePosInstall,
    Reason,
    Quantity,
    DateCreated
  } = req.body;

  // Required fields validation
  if (!UserId || !ProjId || !PosInstallId) {
    return res.status(400).json({ error: 'UserId, ProjId, and PosInstallId are required' });
  }

  const timestamp = DateCreated || new Date().toISOString();

  const sql = `
    INSERT INTO PosInstallCheckListTable (
      UserId, ProjId, PosInstallId, HavePosInstall, Reason, Quantity, DateCreated
    ) VALUES (
      @UserId, @ProjId, @PosInstallId, @HavePosInstall, @Reason, @Quantity, @DateCreated
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'PosInstallId', value: PosInstallId },
    { name: 'HavePosInstall', value: HavePosInstall },
    { name: 'Reason', value: Reason },
    { name: 'Quantity', value: Quantity },
    { name: 'DateCreated', value: timestamp }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'POS install checklist saved successfully' });
  } catch (err) {
    console.error('Checklist insert error:', err);
    res.status(500).json({ error: 'Server error while saving checklist' });
  }
};

//API for Pos Installation Consumables Images
exports.addPosInstallImage = async (req, res) => {
  const {
    UserId,
    ProjId,
    PosInstallChkID,
    ImgUrl
  } = req.body;

  if (!UserId || !ProjId || !PosInstallChkID) {
    return res.status(400).json({ error: 'UserId, ProjId, and PosInstallChkID are required' });
  }

  const sql = `
    INSERT INTO PosInstallImgTable (
      UserId, ProjId, PosInstallChkID, ImgUrl
    ) VALUES (
      @UserId, @ProjId, @PosInstallChkID, @ImgUrl
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'PosInstallChkID', value: PosInstallChkID },
    { name: 'ImgUrl', value: ImgUrl }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'POS install image saved successfully' });
  } catch (err) {
    console.error('Image insert error:', err);
    res.status(500).json({ error: 'Server error while saving image' });
  }
};


//API for Leave Behind Checklist
exports.addLeaveBehindChecklist = async (req, res) => {
  const {
    UserId,
    ProjId,
    LeaveBehindToolId,
    HaveLeaveBehind,
    Reason,
    Quantity,
    ToolKitUrl
  } = req.body;

  if (!UserId || !ProjId || !LeaveBehindToolId) {
    return res.status(400).json({ error: 'UserId, ProjId, and LeaveBehindToolId are required' });
  }

  const DateCreated = new Date().toISOString();

  const sql = `
    INSERT INTO LeaveBehindCheckListTable (
      UserId, ProjId, LeaveBehindToolId, HaveLeaveBehind,
      Reason, Quantity, ToolKitUrl, DateCreated
    ) VALUES (
      @UserId, @ProjId, @LeaveBehindToolId, @HaveLeaveBehind,
      @Reason, @Quantity, @ToolKitUrl, @DateCreated
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'LeaveBehindToolId', value: LeaveBehindToolId },
    { name: 'HaveLeaveBehind', value: HaveLeaveBehind },
    { name: 'Reason', value: Reason },
    { name: 'Quantity', value: Quantity },
    { name: 'ToolKitUrl', value: ToolKitUrl },
    { name: 'DateCreated', value: DateCreated }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Leave-behind checklist item added successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Server error while inserting checklist item' });
  }
};

//API for Leave Behind Image
exports.addLeaveBehindImage = async (req, res) => {
  const {
    UserId,
    ProjId,
    LeaveBehindID,
    ToolKitUrl
  } = req.body;

  if (!UserId || !ProjId || !LeaveBehindID) {
    return res.status(400).json({ error: 'UserId, ProjId, and LeaveBehindID are required' });
  }

  const sql = `
    INSERT INTO LeaveBehindImgTable (
      UserId, ProjId, LeaveBehindID, ToolKitUrl
    ) VALUES (
      @UserId, @ProjId, @LeaveBehindID, @ToolKitUrl
    )
  `;

  const params = [
    { name: 'UserId', value: UserId },
    { name: 'ProjId', value: ProjId },
    { name: 'LeaveBehindID', value: LeaveBehindID },
    { name: 'ToolKitUrl', value: ToolKitUrl }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Leave-behind image uploaded successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Server error while uploading image' });
  }
};


//API for dress code checklist

exports.addDressCodeChecklist = async (req, res) => {
  const {
    ProjId,
    UserId,
    DressCodeId,
    Dressed,
    Reason,
    DateCreated
  } = req.body;

  if (!ProjId || !UserId || !DressCodeId) {
    return res.status(400).json({ error: 'ProjId, UserId, and DressCodeId are required' });
  }

  const timestamp = DateCreated || new Date().toISOString();

  const sql = `
    INSERT INTO DressCodeCheckListTable (
      ProjId, UserId, DressCodeId, Dressed, Reason, DateCreated
    ) VALUES (
      @ProjId, @UserId, @DressCodeId, @Dressed, @Reason, @DateCreated
    )
  `;

  const params = [
    { name: 'ProjId', value: ProjId },
    { name: 'UserId', value: UserId },
    { name: 'DressCodeId', value: DressCodeId },
    { name: 'Dressed', value: Dressed },
    { name: 'Reason', value: Reason },
    { name: 'DateCreated', value: timestamp }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Dress code checklist added successfully' });
  } catch (err) {
    console.error('Checklist insert error:', err);
    res.status(500).json({ error: 'Error saving checklist data' });
  }
};


//API for dress code Images

exports.addDressImage = async (req, res) => {
  const {
    ProjId,
    UserId,
    DressCodeCheckListId,
    FacilatorId,
    DressCodeHalfPic,
    DressCodeFullPic,
    DateCreated
  } = req.body;

  if (!ProjId || !UserId || !DressCodeCheckListId || !FacilatorId || !DressCodeHalfPic || !DressCodeFullPic) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const timestamp = DateCreated || new Date().toISOString();

  const sql = `
    INSERT INTO DressFacilatorTable (
      ProjId, UserId, DressCodeCheckListId, FacilatorId,
      DressCodeHalfPic, DressCodeFullPic, DateCreated
    ) VALUES (
      @ProjId, @UserId, @DressCodeCheckListId, @FacilatorId,
      @DressCodeHalfPic, @DressCodeFullPic, @DateCreated
    )
  `;

  const params = [
    { name: 'ProjId', value: ProjId },
    { name: 'UserId', value: UserId },
    { name: 'DressCodeCheckListId', value: DressCodeCheckListId },
    { name: 'FacilatorId', value: FacilatorId },
    { name: 'DressCodeHalfPic', value: DressCodeHalfPic },
    { name: 'DressCodeFullPic', value: DressCodeFullPic },
    { name: 'DateCreated', value: timestamp }
  ];

  try {
    await querySQLServer(sql, params);
    res.status(201).json({ message: 'Facilitator dress images added successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Error saving facilitator dress data' });
  }
};
