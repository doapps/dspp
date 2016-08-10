var tree = [
  {
    "path": "diagram",
    "type": "tree"
  },
  {
    "path": "diagram/architecture",
    "type": "tree"
  },
  {
    "path": "diagram/architecture/README.md",
    "type": "blob"
  },
  {
    "path": "diagram/architecture/files.toml",
    "type": "blob"
  },
  {
    "path": "diagram/database",
    "type": "tree"
  },
  {
    "path": "diagram/database/README.md",
    "type": "blob"
  },
  {
    "path": "diagram/database/files.toml",
    "type": "blob"
  },
  {
    "path": "diagram/software",
    "type": "tree"
  },
  {
    "path": "diagram/software/README.md",
    "type": "blob"
  },
  {
    "path": "diagram/software/files.toml",
    "type": "blob"
  },
  {
    "path": "doc",
    "type": "tree"
  },
  {
    "path": "doc/agreements",
    "type": "tree"
  },
  {
    "path": "doc/agreements/README.md",
    "type": "blob"
  },
  {
    "path": "doc/agreements/files.toml",
    "type": "blob"
  },
  {
    "path": "doc/closure",
    "type": "tree"
  },
  {
    "path": "doc/closure/README.md",
    "type": "blob"
  },
  {
    "path": "doc/closure/files.toml",
    "type": "blob"
  },
  {
    "path": "doc/planning",
    "type": "tree"
  },
 {
   "path": "doc/planning/files.toml",
   "type": "blob"
 },
  {
    "path": "doc/planning/schedule",
    "type": "tree"
  },
  {
    "path": "doc/planning/schedule/README.md",
    "type": "blob"
  },
  {
    "path": "doc/planning/schedule/files.toml",
    "type": "blob"
  },
  {
    "path": "doc/testing",
    "type": "tree"
  },
  {
    "path": "doc/testing/README.md",
    "type": "blob"
  },
  {
    "path": "doc/testing/files.toml",
    "type": "blob"
  },
  {
    "path": "environment",
    "type": "tree"
  },
  {
   "path": "environment/files.toml",
   "type": "blob"
  },
  {
    "path": "environment/project-resources",
    "type": "tree"
  },
  {
    "path": "environment/project-resources/README.md",
    "type": "blob"
  },
];

var objBase = {
  diagram: {
    architecture: [],
    database: [],
    software: []
  },
  doc: {
    agreements: [],
    closure: [],
    planning: {
      schedule: []
    },
    testing: []
  },
  environment: {
    'project-resources': []
  }
};

var filesContentBuilderTest = {
  "diagram/architecture":  {
    "architecture": {
      "template": "template-blank-document"
    }
  },
  "diagram/database": {
    "CHANGELOG": {
      "template": "template-blank-document"
    },
    "erd.<macrotarget>": {
      "template": "template-blank-document"
    },
    "erd.<macrotarget>.spec": {
      "template": "template-blank-document",
      "body": {
        "doc-title": "Documento de diccionario de datos (<macrotarget>)",
        "content": "content:database-spec"
      }
    }
  },
  "doc/planning": {
    "custom": {
      "template": "template-blank-document"
    }
  },
  "environment": {
    "custom": {
      "template": "template-blank-document"
    }
  },
  "diagram/software": {
    "CHANGELOG": {
      "template": "template-blank-document"
    },
    "endpoints": {
      "template": "template-blank-document",
      "body": {
        "doc-title": "Listado de servicios web, sockets y notificaciones",
        "content": "content:sofware-endpoints"
      }
    },
    "process": {
      "template": "template-blank-document"
    },
    "sequence": {
      "template": "template-blank-document"
    }
  },
  "doc/agreements": {
    "meeting-minutes": {
      "template": "template-blank-document",
      "body": {
        "doc-title": "Documento de acta de reunión",
        "content": "content:agreements-meeting-minutes"
      }
    }
  },
  "doc/closure": {
    "release-manual.<target>": {
      "template": "template-blank-document",
      "body": {
        "doc-title": "Manual de publicación del aplicativo <target>",
        "content": "content:closure-release-manual"
      }
    },
    "technical-release.<target>": {
      "template": "template-blank-document",
      "body": {
        "doc-title": "Informe técnico del aplicativo <target>",
        "content": "content:closure-technical-release"
      }
    }
  },
  "doc/planning/schedule": {
    "schedule": {
      "template": "template-blank-document"
    },
    "overview": {
      "template": "template-blank-document",
      "body": {
        "doc-title": "Documento de especificación de cronograma",
        "content": "content:schedule-overview"
      }
    }
  },
  "doc/testing": {
    "specification": {
      "template": "template-blank-document",
      "body": {
        "doc-title": "Documento de especificación de pruebas",
        "content": "content:testing-specification"
      }
    }
  }
};

var templateList = {
  "template-blank-document": {
    "filename": "template:blank-document",
    "body": {
      "project-name": "<project-name>"
    }
  },
  "template-changelog": {
    "filename": "template:changelog"
  },
  "template-diagram-architecture": {
    "filename": "template:diagram-architecture"
  },
  "template-database-diagram": {
    "filename": "template:database-diagram"
  },
  "template-sofware-process": {
    "filename": "template:sofware-process"
  },
  "template-sofware-sequence": {
    "filename": "template:sofware-sequence"
  },
  "template-planning-schedule": {
    "filename": "template:planning-schedule"
  },
  "template-environment-constants": {
    "filename": "template:environment-constants"
  },
  "template-environment-credentials": {
    "filename": "template:environment-credentials"
  },
  "template-environment-variables": {
    "filename": "template:environment-variables"
  },
  "template-ui-constants": {
    "filename": "template:ui-constants"
  },
  "template-ui-android-illustrator": {
    "filename": "template:ui-android-illustrator"
  },
  "template-ui-ios-illustrator": {
    "filename": "template:ui-ios-illustrator"
  },
  "template-ui-web-illustrator": {
    "filename": "template:ui-web-illustrator"
  }
};

function buildTreeNodesBase(folderNodes, rootFolder, objTree, appendString) {
  for (var node in objTree) {
    if (objTree.hasOwnProperty(node)) {
      if (typeof objTree[node] == "object" && objTree[node] !== null) {
        var childNode = rootFolder.createFolder(node);
        var directoryString = (appendString + '.' + node).slice(1);
        folderNodes[directoryString] = childNode;
        buildTreeNodesBase(folderNodes, childNode, objTree[node], appendString + '.' + node);
      } else {
        Logger.log(objTree[node]);
      }
    }
  }
}

function buildTreeNodes(rootFolder, objTree) {
  var folderNodes = {};
  buildTreeNodesBase(folderNodes, rootFolder, objTree, '');
  return folderNodes;
}

function loadTemplateFiles() {
  var folderRoot = DriveApp.getRootFolder();
  var folderRootIterator = folderRoot.getFoldersByName('templates');
  var templateFolder;
  var fileTemplates = {};

  if (folderRootIterator.hasNext()) {
    templateFolder = folderRootIterator.next();
  }

  var files = templateFolder.getFiles();

  while(files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();

    fileTemplates[fileName] = file;
  }

  return fileTemplates;
};

function buildFiles(folderNodes, listFiles) {
  var fileTemplates = loadTemplateFiles();

  listFiles.forEach(function(filePath) {
    var files = filesContentBuilderTest[filePath];

    for (var fileName in files) {
      if(files.hasOwnProperty(fileName)) {
        var fileDescription = files[fileName];
        var templateName = fileDescription.template;
        var templateFilename = templateList[templateName].filename;
        var templateFile = fileTemplates[templateFilename];
        var folderPathDestination = filePath.replace(/\//g, '.');
        var folderDestination = folderNodes[folderPathDestination];
        var newFile = templateFile.makeCopy(fileName, folderDestination);

        var fileId = newFile.getId();
        var documentOpened = DocumentApp.openById(fileId);
        documentOpened.getBody().replaceText('{project-name}', 'palabra');
      }
    }
  });
}

function parseFactoryFiles(treeObj) {
  var fileBuilderName = '/files.toml';
  var nestingFiles = treeObj.filter(function(node) {
    return node.type === 'blob' && !!~node.path.indexOf(fileBuilderName);
  })
  .map(function(node) {
    return node.path.slice(0, node.path.indexOf(fileBuilderName))
  });

  return nestingFiles;
}

function parseTreeIntoObject(treeObj) {
  var readmeFile = '/README.md';
  var nestingFolders = treeObj.filter(function(node) {
    return node.type === 'blob' && !!~node.path.indexOf(readmeFile);
  })
  .map(function(node) {
    return node.path.slice(0, node.path.indexOf(readmeFile));
  })
  .map(function(node) {
    return node.replace(/\//g, '.');
  })
  .filter(function(node) {
    return !!~node.indexOf('.');
  });

  var arrayFills = _.fill(Array(nestingFolders.length), []);
  var parsedTree = _.zipObjectDeep(nestingFolders, arrayFills);

  return parsedTree;
}

function mergeFiles() {
  var template_fileId = '16riHMP7O_XLvj46C5c4s1g9ptdSzlh6MwGEQz-eADhs';
  var content_fileId = '1t70yJFN6JkHWyFTAjhQeD0t_gsgeaz_J_wS10H7DDNc';

  var template = DocumentApp.openById(template_fileId);
  var bodyTemplate = template.getBody();

  var bodyContent = DocumentApp.openById(content_fileId).getBody();
  var totalElements = bodyContent.getNumChildren();

  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = '#666666';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;
  bodyContent.setAttributes(style);

  bodyTemplate.replaceText('{content}', '');

  for(var i = 0; i < totalElements; ++i) {
    var element = bodyContent.getChild(i).copy();
    var type = element.getType();

    if (type == DocumentApp.ElementType.PARAGRAPH) {
      bodyTemplate.appendParagraph(element);
    } else if (type == DocumentApp.ElementType.TABLE) {
      bodyTemplate.appendTable(element);
    } else if (type == DocumentApp.ElementType.LIST_ITEM) {
      bodyTemplate.appendListItem(element);
    } else {
      /*
      bodyTemplate.appendHorizontalRule(element);
      bodyTemplate.appendImage(element);
      bodyTemplate.appendPageBreak(element);
      bodyTemplate.appendParagraph(element);
      */
      Logger.log('Unknown element type: ' + type);
    }
  }
}

function run() {
  var rootFolder = DriveApp.createFolder('project');
  var objectTree = parseTreeIntoObject(tree);
  var directoryFiles = parseFactoryFiles(tree);

  var folderNodes = buildTreeNodes(rootFolder, objectTree);

  buildFiles(folderNodes, directoryFiles);
}
