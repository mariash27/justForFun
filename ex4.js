const folders = [
    {
      name: "Documents",
      subfolders: [
        {
          name: "Work",
          subfolders: [
            { name: "Projects", subfolders: [] },
            { name: "Reports", subfolders: [] }
          ]
        },
        { name: "Personal", subfolders: [] }
      ]
    },
    {
      name: "Pictures",
      subfolders: [
        {
          name: "Vacation",
          subfolders: [
            { name: "Summer", subfolders: [] },
            { name: "Winter", subfolders: [] }
          ]
        }
      ]
    }
  ];

  
  function printFolders(folders, level = 0){
    for( let i = 0; i < folders.length; i++ ){
        let folder = folders[i]
        let spaces = '  '.repeat(level)
        console.log(`${spaces}- ${folder.name}`)

        if(folder.subfolders.length > 0){
            printFolders(folder.subfolders, level + 1)
        }

    }

  }


  printFolders(folders)