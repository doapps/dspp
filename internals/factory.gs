function buildTreeNodesBase( folderNodes, rootFolder, objFolders, appendString ) {
  for ( var node in objFolders ) {
    if ( objFolders.hasOwnProperty( node ) ) {
      if ( typeof objFolders[ node ] == "object" && objFolders[ node ] !== null ) {
        var childNode = rootFolder.createFolder( node );
        var directoryString = ( appendString + '/' + node ).slice( 1 );

        Logger.log( 'directoryString: ' + directoryString );
        folderNodes[ directoryString ] = childNode;
        buildTreeNodesBase( folderNodes, childNode, objFolders[ node ], appendString + '/' + node );
      } else {
        Logger.log( 'done: ' + node );
      }
    }
  }
}

function buildTreeNodes( rootFolder, objFolders ) {
  var folderNodes = {};
  buildTreeNodesBase( folderNodes, rootFolder, objFolders, '' );
  Logger.log( '-->buildTreeNodes' );
  return folderNodes;
}

function loadTemplateFiles( templateFolder ) {
  Logger.log( '-->loadTemplateFiles' );
  var files = templateFolder.getFiles();
  var fileTemplates = {};

  while( files.hasNext() ) {
    var file = files.next();
    var fileName = file.getName();

    fileTemplates[ fileName ] = file;
  }

  return fileTemplates;
}

function buildFiles( folderNodes, filesToBuild, dataTemplates, templateFolder ) {
  var fileTemplates = loadTemplateFiles( templateFolder );

  for ( var path in filesToBuild ) {
    var files = filesToBuild[ path ];
    Logger.log( '->path: ' + path );

    for ( var fileName in files ) {
      if ( files.hasOwnProperty( fileName ) ) {
        Logger.log( '->fileName: ' + fileName );
        // var fileDescription = files[ fileName ];
        // var templateName = fileDescription.template;
        // var templateFilename = dataTemplates[ templateName ].filename;
        // var templateFile = fileTemplates[ templateFilename ];
        // var folderDestination = folderNodes[ path ];
        // var newFile = templateFile.makeCopy( fileName, folderDestination );

        // var fileId = newFile.getId();
        // var documentOpened = DocumentApp.openById( fileId );
        // documentOpened.getBody().replaceText( '{project-name}', 'palabra' );

        var folderDestination = folderNodes[ path ];
        folderDestination.createFile(fileName, fileName, MimeType.MICROSOFT_WORD);
      }
    }
  }
}

function buildProject( objParameters ) {
  objParameters = objParameters || {};
  var response = { status: 203 };
  Logger.log('run');

  var objFolders = objParameters.objFolders;
  var dataTemplates = objParameters.dataTemplates;
  var filesToBuild = objParameters.filesToBuild;
  var ownerFoldersInfo = objParameters.ownerFoldersInfo;

  var rootFolderId = ownerFoldersInfo.rootFolderId;
  var templatesFolderId = ownerFoldersInfo.templatesFolderId;
  var projectNamespace = ownerFoldersInfo.projectNamespace;
  var rootFolder = DriveApp.getFolderById( rootFolderId );

  var templatesFolder = DriveApp.getFolderById( templatesFolderId );
  var projectFolder = rootFolder.createFolder( projectNamespace );

  var folderNodes = buildTreeNodes( projectFolder, objFolders );

  Logger.log( '<-before execute buildFiles->' );
  buildFiles( folderNodes, filesToBuild, dataTemplates, templatesFolder );

  return response;
}
