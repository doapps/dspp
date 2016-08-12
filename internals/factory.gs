function buildTreeNodesBase( folderNodes, rootFolder, objFolders, appendString ) {
  for ( var node in objFolders ) {
    if ( objFolders.hasOwnProperty( node ) ) {
      if ( typeof objFolders[ node ] == "object" && objFolders[ node ] !== null ) {
        var childNode = rootFolder.createFolder( node );
        var directoryString = ( appendString + '/' + node ).slice( 1 );

        // Logger.log( 'directoryString: ' + directoryString );
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
  Logger.log('fileContent:' + fileContent);
  Logger.log('fileTarget:' + fileTarget);

  var bodyFileContent = fileContent.getBody();
  var bodyFileTarget = fileContent.getBody();
  var style = getStyleDocument();
  var totalElements = bodyFileContent.getNumChildren();

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
        Logger.log('file_created:' + file_created);

        var fileBody = fileDescription.body || {};
        var templateBody = dataTemplates[ templateName ].body || {};
        var bodyContentNewFile = extend({}, fileBody, templateBody);

        if ( ! objectEmpty( bodyContentNewFile ) ) {
          var contentFile = bodyContentNewFile.content;

          // var bodyDocument = file_created.getBody();
          var fileId = file_created.getId();
          var fileCreatedOpened = openDocument( fileId );
          var bodyDocument = fileCreatedOpened.getBody();

          Logger.log('fileId:' + fileId);
          Logger.log('-bodyContentNewFile-');
          Logger.log(bodyContentNewFile);

          for ( var prop in bodyContentNewFile ) {
            var textContent = bodyContentNewFile[ prop ];
            var pattern;

            if ( prop === 'content' ) {
              continue;
            } else if ( /doc-title/.test( prop ) ) {
              pattern = '{doc-title}';
            } else if ( /project-name/.test( prop ) ) {
              pattern = '{project-name}';
            } else {
              return;
            }

            Logger.log('prop:'+prop);
            Logger.log('textContent:' + textContent);

            bodyDocument.replaceText( pattern, textContent );
          }

          if ( contentFile ) {
            Logger.log('contentFile:' + contentFile);
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
  var response = { status: 204 };
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

function test() {
  Logger.log('hey there');
}
