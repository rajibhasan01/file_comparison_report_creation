import { spawn } from 'child_process';

export const avrgRightCornerColor = async(name) => {
    return new Promise((resolve , reject) => {
      const childPython = spawn('python3' ,['./avrgBgColor.py', name]);
      var result = '';
      childPython.stdout.on(`data` , (data) => {
          result += data.toString();
      });

      childPython.on('close' , function(code) {
          resolve(result)
      });
      childPython.on('error' , function(err){
          reject(err)
      });

  }).catch(error => {
    console.log("error");
    throw error;
  })
  };
