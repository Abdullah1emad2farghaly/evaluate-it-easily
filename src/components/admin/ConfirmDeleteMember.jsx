import React from 'react'

export default function ConfirmDeleteMember({ isOpen, onClose, onConfirm }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[420px] p-6 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 text-red-600 rounded-md p-2">
                        ❌
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Remove member from group?
                    </h2>
                </div>

                {/* Content */}
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Are you sure you want to remove this member? They will lose access to all
                    group projects and shared assets. This action can be undone by
                    re-inviting them later.
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 shadow"
                    >
                        Remove Member
                    </button>
                </div>
            </div>
        </div>
    );
}
