import { useState, useEffect, useRef } from 'react';

export const useRoomContextMenu = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuRoom, setContextMenuRoom] = useState(null);
  const contextMenuRef = useRef(null);

  // Handle click outside context menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setShowContextMenu(false);
        setContextMenuRoom(null);
      }
    };

    if (showContextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showContextMenu]);

  const handleRoomClick = (room, event) => {
    if (room.Status === 'O') {
      event.preventDefault();
      event.stopPropagation();
      
      const rect = event.currentTarget.getBoundingClientRect();
      setContextMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
      setContextMenuRoom(room);
      setShowContextMenu(true);
    }
  };

  const handleGuestInfoClick = () => {
    if (contextMenuRoom) {
      setSelectedRoom(contextMenuRoom);
      setShowCheckoutModal(true);
      setShowContextMenu(false);
      setContextMenuRoom(null);
    }
  };

  const closeModal = () => {
    setShowCheckoutModal(false);
    setSelectedRoom(null);
  };

  const closeContextMenu = () => {
    setShowContextMenu(false);
    setContextMenuRoom(null);
  };

  return {
    // State
    showCheckoutModal,
    selectedRoom,
    showContextMenu,
    contextMenuPosition,
    contextMenuRoom,
    contextMenuRef,
    
    // Handlers
    handleRoomClick,
    handleGuestInfoClick,
    closeModal,
    closeContextMenu,
    
    // Setters (if needed for external control)
    setShowCheckoutModal,
    setSelectedRoom,
    setShowContextMenu,
    setContextMenuRoom
  };
};
