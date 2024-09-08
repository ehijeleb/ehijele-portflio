import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  if (!project) return null; // Ensure the project exists before rendering

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      aria-labelledby="modal-title"
      className="flex  my-36  fixed inset-0 z-50 bg-zinc-50 " 
    >
      <ModalContent className=" bg-neutral-50  text-black rounded-lg p-6  overflow-auto w-full mx-auto shadow-xl">
        <ModalHeader>
          <h2 id="modal-title" className="text-2xl text-center">{project.title}</h2>
        </ModalHeader>
        <ModalBody>
          <img
            src={project.image}
            alt={project.title}
            className="w-full  object-cover rounded-lg mb-4"
          />
          <p className="mb-4">{project.description}</p>
          <p><strong>Technology:</strong> {project.technology}</p>
        </ModalBody>
        <ModalFooter className="flex justify-end">
          <Button onPress={onClose} className="bg-red-500 text-white">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailModal;
