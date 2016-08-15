function buildTreeNodesBase( folderNodes, rootFolder, objFolders, appendString ) {
  for ( var node in objFolders ) {
    if ( objFolders.hasOwnProperty( node ) ) {
      if ( typeof objFolders[ node ] == "object" && objFolders[ node ] !== null ) {
        var childNode = rootFolder.createFolder( node );
        var directoryString = ( appendString + '/' + node ).slice( 1 );
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
  return folderNodes;
}

function loadTemplateFiles( templateFolder ) {
  var files = templateFolder.getFiles();
  var fileTemplates = {};

  while( files.hasNext() ) {
    var file = files.next();
    var fileName = file.getName();

    fileTemplates[ fileName ] = file;
  }

  return fileTemplates;
}

function getStyleDocument() {
  var style = {};
  style[DocumentApp.Attribute.FONT_FAMILY] = 'Open Sans';
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = '#666666';
  style[DocumentApp.Attribute.FONT_SIZE] = 11;

  return style;
}

function mergeFiles( fileContent, fileTarget ) {
  var bodyFileContent = fileContent.getBody();
  var bodyFileTarget = fileTarget.getBody();
  var style = getStyleDocument();
  var totalElements = bodyFileContent.getNumChildren();

  Logger.log( 'totalElements' + totalElements );

  bodyFileContent.setAttributes( style );

  for(var i = 0; i < totalElements; ++i) {
    var element = bodyFileContent.getChild(i).copy();
    var type = element.getType();

    if (type == DocumentApp.ElementType.PARAGRAPH) {
      bodyFileTarget.appendParagraph(element);
    } else if (type == DocumentApp.ElementType.TABLE) {
      bodyFileTarget.appendTable(element);
    } else if (type == DocumentApp.ElementType.LIST_ITEM) {
      bodyFileTarget.appendListItem(element);
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

function extend(target) {
  for(var i=1; i<arguments.length; ++i) {
    var from = arguments[i];
    if(typeof from !== 'object') continue;
    for(var j in from) {
      if(from.hasOwnProperty(j)) {
        target[j] = typeof from[j]==='object'
        ? extend({}, target[j], from[j])
        : from[j];
      }
    }
  }

  return target;
}

function objectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function openDocument( id ) {
  var file = DocumentApp.openById( id );
  return file;
}

function buildFiles( folderNodes, filesToBuild, dataTemplates, templateFolder ) {
  var fileTemplates = loadTemplateFiles( templateFolder );

  for ( var path in filesToBuild ) {
    var files = filesToBuild[ path ];
    Logger.log( '->path: ' + path );

    for ( var fileName in files ) {
      if ( files.hasOwnProperty( fileName ) ) {
        Logger.log( '->fileName: ' + fileName );

        var fileDescription = files[ fileName ];
        var templateName = fileDescription.template;
        var templateFilename = dataTemplates[ templateName ].filename;

        var file_template = fileTemplates[ templateFilename ];
        var folderDestination = folderNodes[ path ];

        var file_created = file_template.makeCopy( fileName, folderDestination );

        var fileBody = fileDescription.body || {};
        var templateBody = dataTemplates[ templateName ].body || {};
        var bodyContentNewFile = extend({}, fileBody, templateBody);

        if ( ! objectEmpty( bodyContentNewFile ) ) {
          var contentFile = bodyContentNewFile.content;

          // var bodyDocument = file_created.getBody();
          var fileId = file_created.getId();
          var fileCreatedOpened = openDocument( fileId );
          var bodyDocument = fileCreatedOpened.getBody();

          for ( var prop in bodyContentNewFile ) {
            var textContent = bodyContentNewFile[ prop ];
            var pattern;

            if ( prop === 'content' ) {
              bodyDocument.replaceText('{content}', '');
              continue;
            } else if ( /doc-title/.test( prop ) ) {
              pattern = '{doc-title}';
            } else if ( /project-name/.test( prop ) ) {
              pattern = '{project-name}';
            } else {
              return;
            }

            bodyDocument.replaceText( pattern, textContent );
          }

          if ( contentFile ) {
            var file_content = fileTemplates[ contentFile ];
            var fileContentId = file_content.getId();
            var fileContentOpened = openDocument( fileContentId );

            mergeFiles( fileContentOpened, fileCreatedOpened );
          }
        }
      }
    }
  }
}

function buildProject( objParameters ) {
  objParameters = objParameters || {};
  var response = { status: 200, folderId: '' };

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

  buildFiles( folderNodes, filesToBuild, dataTemplates, templatesFolder );

  response.folderId = projectFolder.getId();

  return response;
}
