'use client';

import Modal from './Modal';
import { formatStx } from '@/lib/utils';
import ConfirmDialog from './ConfirmDialog';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  vaultId: number;
  amount: string;
  isEmergency?: boolean;
  penalty?: string;
}

export default function WithdrawModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  vaultId, 
  amount,
  isEmergency = false,
  penalty 
}: WithdrawModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={isEmergency ? `Emergency Withdraw from Vault #${vaultId}` : `Withdraw from Vault #${vaultId}`}
      message={
        isEmergency
          ? `Are you sure you want to withdraw ${formatStx(amount)} STX early? A penalty of ${penalty || '10%'} will be applied.`
          : `Are you sure you want to withdraw ${formatStx(amount)} STX from vault #${vaultId}?`
      }
      confirmText={isEmergency ? 'Withdraw with Penalty' : 'Withdraw'}
      variant={isEmergency ? 'danger' : 'default'}
    />
  );
}

