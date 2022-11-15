import { spawn } from 'child_process';

export const runPythonScript = async(name) => {
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

 let result = await runPythonScript(`/home/rajibhasan/Desktop/gifbuz-tump/Cekf_0744.mp4`);
 result = Number(result);

 const alpha = result < 50 ? 0 : result < 87 ? 0.1 : result < 167 ? 0.35 : result < 209 ? 0.75  : 1;
 console.log(alpha)