import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import TechTag from '../TechTag';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent className="bg-white rounded-2xl overflow-hidden">
        <ModalHeader className="px-6 pt-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
        </ModalHeader>
        <ModalBody className="px-6 pb-7">
          {/* Image */}
          <div className="w-full h-56 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-600 mb-5">
            {!imgError ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-6xl font-bold opacity-20">{project.title.charAt(0)}</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map(t => <TechTag key={t} tech={t} />)}
          </div>

          {/* Links */}
          <div className="flex gap-3 flex-wrap">
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt=""
                className="w-4 h-4 invert"
              />
              View on GitHub
            </a>
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                ↗ Live Demo
              </a>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailModal;
