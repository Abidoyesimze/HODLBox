# HODLBox Contract Information

## Testnet Deployment

**Contract Address:** `STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox`
**Contract Name:** `hodlbox`
**Deployer Address:** `STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X`
**Network:** Testnet

## Frontend Integration

Use this contract address in your frontend:

```typescript
const CONTRACT_ADDRESS = "STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox";
const CONTRACT_NAME = "hodlbox";
const NETWORK = "testnet";
```

## Contract Functions

### Public Functions
- `create-vault(amount uint, unlock-height uint, note (string-ascii 256))` - Create a new vault
- `withdraw(vault-id uint)` - Withdraw from unlocked vault
- `emergency-withdraw(vault-id uint)` - Early withdrawal with penalty
- `add-to-vault(vault-id uint, amount uint)` - Add funds to existing vault
- `cancel-vault(vault-id uint)` - Cancel an unfunded vault

### Read-Only Functions
- `get-vault(vault-id uint)` - Get vault details
- `get-user-vaults(user principal)` - Get all vault IDs for a user
- `is-vault-unlocked(vault-id uint)` - Check if vault is unlocked
- `get-user-stats(user principal)` - Get user statistics
- `get-user-achievement(user principal, achievement-type (string-ascii 64))` - Get achievement NFT

## Explorer Links

After deployment, view on:
- Stacks Explorer: https://explorer.stacks.co/?chain=testnet
- Search for: `STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox`

