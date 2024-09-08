import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  if (!project) return null; // Ensure the project exists before rendering

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      aria-labelledby="modal-title"
      className=" bg-zinc-50 " 
    >
      <ModalContent className=" bg-neutral-50  text-black rounded-lg p-6 w-full  shadow-xl">
        <ModalHeader>
          <h2 id="modal-title" className="text-2xl mb-4 text-gray-800 text-center">{project.title}</h2>
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
        <Button color="danger" variant="light" onPress={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">
                Cancel
              </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailModal;
