const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Member = require('../../models/Member');
const mongoose = require('mongoose');

//@route   POST api/members
//@desc    Create a member
//@access  Private
router.post(
  '/',
  [
    auth,
    [
      check('notes', 'Notes is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('status', 'Status is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newMember = new Member({
        notes: req.body.notes,
        name: req.body.name,
        company: req.body.company,
        status: req.body.status,
        user: req.user.id,
        createdBy: user.name,
      });

      const member = await newMember.save();

      return res.json(member);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//@route   Get api/members/
//@desc    Get members of the logged in user
//@access  Private

router.get('/', auth, async (req, res) => {
  try {
    const members = await Member.find({ user: req.user.id });
    return res.json(members);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

//@route   DELETE api/members/:memberId
//@desc    DELETE a member
//@access  Private

router.delete('/:memberId', auth, async (req, res) => {
  try {
    const valid = mongoose.Types.ObjectId.isValid(req.params.memberId);
    if (!valid) return res.status(400).json({ msg: 'Member not found' });

    const member = await Member.findById(req.params.memberId);
    if (!member) {
      return res.status(404).json({ msg: 'No member found' });
    }
    if (member.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: ' User not authorized' });
    }

    await member.remove();
    return res.json({ msg: 'Member Deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Member not found' });
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
