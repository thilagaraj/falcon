import { useState, useEffect, useRef } from "react";

export const useRoomContextMenu = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showHouseGuestModal, setShowHouseGuestModal] = useState(false);
  const [showExtraPaxModal, setShowExtraPaxModal] = useState(false);
  const [showGracePeriodModal, setShowGracePeriodModal] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuRoom, setContextMenuRoom] = useState(null);
  const contextMenuRef = useRef(null);

  // Handle click outside context menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setShowContextMenu(false);
        setContextMenuRoom(null);
      }
    };

    if (showContextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContextMenu]);

  const handleRoomClick = (room, event) => {
    if (room.Status === "O") {
      event.preventDefault();
      event.stopPropagation();

      const rect = event.currentTarget.getBoundingClientRect();
      setContextMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setContextMenuRoom(room);
      setShowContextMenu(true);
    }
  };

  const handleGuestInfoClick = () => {
      setSelectedRoom(contextMenuRoom);
      setShowCheckoutModal(true);
      setShowContextMenu(false);
      setContextMenuRoom(null);
  };

  const handleHouseGuestClick = () => {
      setSelectedRoom(contextMenuRoom);
      setShowHouseGuestModal(true);
      setShowContextMenu(false);
      setContextMenuRoom(null);
  };

  const handleExtraPaxClick = () => {
      setSelectedRoom(contextMenuRoom);
      setShowExtraPaxModal(true);
      setShowContextMenu(false);
      setContextMenuRoom(null);
  };

  const handleGracePeriodClick = () => {
      setSelectedRoom(contextMenuRoom);
      setShowGracePeriodModal(true);
      setShowContextMenu(false);
      setContextMenuRoom(null);
  };

  const closeModal = () => {
    setShowCheckoutModal(false);
    setShowHouseGuestModal(false);
    setShowExtraPaxModal(false);
    setShowGracePeriodModal(false);
    setSelectedRoom(null);
  };

  const closeContextMenu = () => {
    setShowContextMenu(false);
    setContextMenuRoom(null);
  };

  return {
    // State
    showCheckoutModal,
    showHouseGuestModal,
    showExtraPaxModal,
    showGracePeriodModal,
    selectedRoom,
    showContextMenu,
    contextMenuPosition,
    contextMenuRoom,
    contextMenuRef,

    // Handlers
    handleRoomClick,
    handleGuestInfoClick,
    handleHouseGuestClick,
    handleExtraPaxClick,
    handleGracePeriodClick,
    closeModal,
    closeContextMenu,

    // Setters (if needed for external control)
    setShowCheckoutModal,
    setSelectedRoom,
    setShowContextMenu,
    setContextMenuRoom,
    setShowExtraPaxModal,
    setShowGracePeriodModal,
  };
};
