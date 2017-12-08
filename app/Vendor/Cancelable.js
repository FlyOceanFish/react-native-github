
export default function makeCancelable(promise){
  let hasCanceled_ = false;
  const wrappePromise = new Promise((resolve,reject)=>{
    promise.then((val)=>{
      hasCanceled_?reject({isCanceled:true}):resolve(val);
    });
    promise.catch((err)=>{
      hasCanceled_?reject({isCanceled:true}):resolve(err);
    });
  })
  return {
    promise:wrappePromise,
    cancel(){
      hasCanceled_=true;
    }
  }
}
