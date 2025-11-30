const fs = require('fs');
const path = require('path');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  // Read the content.json file
  const contentPath = path.resolve(__dirname, '../../src/data/content.json');
  const contentData = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

  // Create RepairWindows node
  const repairWindowsNode = {
    title: contentData.siteInfo.title,
    description: {
      description: contentData.siteInfo.description,
    },
    childContentfulRepairWindowsContactJsonNode: {
      fullName: contentData.contact.fullName,
      email: contentData.contact.email,
      skype: contentData.contact.skype,
      tel: contentData.contact.tel,
      description: contentData.contact.description,
      location: contentData.contact.location,
      legal: contentData.contact.legal,
    },
    id: createNodeId('RepairWindows'),
    internal: {
      type: 'ContentfulRepairWindows',
      contentDigest: createContentDigest(contentData.siteInfo),
    },
  };

  createNode(repairWindowsNode);

  // Create Services nodes
  contentData.services.forEach((service, index) => {
    const serviceNode = {
      title: service.title,
      description: service.description ? {
        description: service.description,
      } : null,
      id: createNodeId(`Service-${index}`),
      internal: {
        type: 'ContentfulRepairWindowServices',
        contentDigest: createContentDigest(service),
      },
    };
    createNode(serviceNode);
  });

  // Create Work nodes
  contentData.work.forEach((work, index) => {
    const workNode = {
      id: work.id,
      title: work.title,
      description: {
        description: work.description,
      },
      icon: {
        gatsbyImageData: null, // Will be handled by StaticImage
        file: {
          url: work.icon,
        },
      },
      id: createNodeId(`Work-${work.id}`),
      internal: {
        type: 'ContentfulRepairWindowWork',
        contentDigest: createContentDigest(work),
      },
    };
    createNode(workNode);
  });

  // Create About node
  const aboutNode = {
    title: contentData.about.title,
    description: {
      description: contentData.about.description,
    },
    id: createNodeId('About'),
    internal: {
      type: 'ContentfulRepairWindowAbout',
      contentDigest: createContentDigest(contentData.about),
    },
  };
  createNode(aboutNode);

  // Create Testing node
  const testingNode = {
    title: contentData.testing.title,
    description: {
      description: contentData.testing.description,
    },
    id: createNodeId('Testing'),
    internal: {
      type: 'ContentfulRepaireWindowsTesting',
      contentDigest: createContentDigest(contentData.testing),
    },
  };
  createNode(testingNode);
};
