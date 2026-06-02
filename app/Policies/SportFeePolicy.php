<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\SportFee;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as AuthUser;

class SportFeePolicy
{
    use HandlesAuthorization;

    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:SportFee');
    }

    public function view(AuthUser $authUser, SportFee $sportFee): bool
    {
        return $authUser->can('View:SportFee');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:SportFee');
    }

    public function update(AuthUser $authUser, SportFee $sportFee): bool
    {
        return $authUser->can('Update:SportFee');
    }

    public function delete(AuthUser $authUser, SportFee $sportFee): bool
    {
        return $authUser->can('Delete:SportFee');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:SportFee');
    }

    public function restore(AuthUser $authUser, SportFee $sportFee): bool
    {
        return $authUser->can('Restore:SportFee');
    }

    public function forceDelete(AuthUser $authUser, SportFee $sportFee): bool
    {
        return $authUser->can('ForceDelete:SportFee');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:SportFee');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:SportFee');
    }

    public function replicate(AuthUser $authUser, SportFee $sportFee): bool
    {
        return $authUser->can('Replicate:SportFee');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:SportFee');
    }
}
