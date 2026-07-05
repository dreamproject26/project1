# Test Credentials
# Agent writes here when creating/modifying auth credentials (admin accounts, test users).
# Testing agent reads this before auth tests. Fork/continuation agents read on startup.

## NN Venture Admin Credentials

**Admin Login:**
- Email: `admin@nnventure.com`
- Password: `cNc260JXpQ7KNxVsz$K@i3bF`

**Old Password (should fail):**
- Password: `demo1234`

**Notes:**
- Admin password was rotated to a strong secret in this iteration
- Old demo password should return 401 Unauthorized
- New password is stored in `/app/backend/.env` as `ADMIN_PASSWORD`
