<?php

namespace App\Http\Controllers;

use App\Models\students;
use Illuminate\Http\Request;
use Validator;
class StudentController extends Controller
{
    public function index(){
        $student = students::all();
        $data = [
            'status' => '200',
            "students" => $student
        ];
        return response()->json($data,200);
    }
    //post
    public function store(Request $request){
        $validator = Validator::make($request->all(),
        [
            'name'=>'required|max:191',
            'email' => 'required|max:191',
            'phone' =>'required|max:191',
            'cource' =>'required|max:10',

        ]);
        if($validator->fails()){
            $data = [
                "status" => 422,
                "errors" => $validator->messages()
            ];
            return response()->json($data,422);
        }
        else{
            $student = students::create([
            'name' => $request->name,
            'cource' => $request->cource,
            'email' => $request->email,
            'phone' => $request->phone,
            ]);
            // $student->save();
            if($student){
                $data1 = [
                    'status' =>200,
                    'message'=>'Data Uploaded Successfully'
                ];
                return response()->json($data1,200);
            }
            else{
                $data2 = [
                    'status' => 500,
                    'message'=>'Something Went Wrong!!!'
                ];
                return response()->json($data2,500);
            }
            
           

        }
    }
    public function edit($id){
        $student = students::find($id);
        if($student){
            return response()->json([
                'status' => 200,
                'student' =>$student
            ],200);
        }else{
                return response()->json([
                    'status' => 404,
                    'student' =>"No Such Student Found!"
                ],404);
        }
    }
    public  function update(Request $request,$id){
        $validator = Validator::make($request->all(),
        [
            'name'=>'required|max:191',
            'email' => 'required|max:191',
            'phone' =>'required|max:191',
            'cource' =>'required|max:10',

        ]);
        if($validator->fails()){
            $data = [
                "status" => 422,
                "errors" => $validator->messages()
            ];
            return response()->json($data,422);
        }
        else{
            $student = students::find($id);
            if($student){

            $student->update([
            'name' => $request->name,
            'cource' => $request->cource,
            'email' => $request->email,
            'phone' => $request->phone,
            ]);
            // $student->save();
           
                $data1 = [
                    'status' =>200,
                    'message'=>'Data Updated Successfully'
                ];
                return response()->json($data1,200);
            }
            else{
                $data2 = [
                    'status' => 404,
                    'message'=>'No such Student Found'
                ];
                return response()->json($data2,500);
            }
            
           

        }
    }
    public function destroy($id){
        $student = students::find($id);
        if($student){
            $student->delete();
        }else{
            return response()->json([
                'status' => 404,
                'student' =>"No Such Student Found!"
            ],404);
        }
    }
}
// $student = students::find($id);

// $student->name = $request->name;
// $student->email = $request->email;
// $student->phone = $request->phone;
// $student->save();