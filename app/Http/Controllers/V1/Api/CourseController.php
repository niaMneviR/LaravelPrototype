<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\V1\Api\CourseResource;
use App\Http\Resources\V1\Api\UserResource;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CourseResource::collection(Course::query()->orderBy('name', 'asc')->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->validated();
        $course = Course::create($data);
        return response(new UserResource($course), 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        return new CourseResource($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $data = $request->validated();
        $temp = $course->update($data);

        return response(new CourseResource($temp), 204)->json([
            $temp
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $temp = $course->toArray();
        $temp["archived"] = "archived";
        $course->update($temp);

        return response()->json([
            $temp
        ]);
    }
}
