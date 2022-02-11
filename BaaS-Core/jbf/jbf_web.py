import json
import os
import uuid
import zipfile
import datetime
from subprocess import run, CalledProcessError, PIPE
import requests
from flask import Flask, request, jsonify, render_template, send_from_directory
import repo_statistics as repo_state
from flask_cors import CORS

app = Flask(__name__, template_folder='templates')
CORS(app)


@app.route('/compiled/<string:filename>')
def get_image(filename):
    print(os.getcwd())
    return send_from_directory(os.getcwd() + "/ARCHIVE/", path=filename, as_attachment=False)


@app.route('/project', methods=['Post'])
def get_project_url():
    request_body = request.json
    owner = request_body["owner"]
    repo = request_body["repo"]
    branch = request_body["branch"]
    commit_sha = request_body["commit_sha"]

    repo_directory_name = owner + "##" + repo
    repo_saved_file_path = "./PROJECTS/dir_0/" + repo_directory_name + ".zip"
    download_url = "https://github.com/" + owner + "/" + repo + "/" + "/archive/" + commit_sha + ".zip"
    download_and_save_a_repository(download_url, repo_saved_file_path)
    unzip_temp_path = "./TEMP/" + repo_directory_name
    repo_state_result = repo_state.compute_metric_in_a_repo(repo_saved_file_path, unzip_temp_path)

    execute_jbf()
    compiled_dir_path = "./COMPILED"
    compiled_state_result = repo_state.count_class_files(compiled_dir_path)
    repo_state_result['class_files'] = compiled_state_result
    print(repo_state_result)

    project_json_path = "./COMPILED/project_details.json"
    build_result = load_json(project_json_path)
    print(build_result)
    #
    # current_time_stamp = datetime.datetime.now()
    # id=str(uuid.uuid4())
    compiled_repo_zip_file_name = commit_sha + ".zip"
    archive_compiled_project(compiled_repo_zip_file_name)
    move_to_archive(compiled_repo_zip_file_name, "./ARCHIVE")

    clean_up_jbf_generated_files()
    clean_up_compiled_dir()
    clean_up_downloaded_project_dir(repo_saved_file_path)

    # return jsonify("Done")
    return prepare_response(owner, repo, branch, commit_sha, repo_state_result, build_result)


def prepare_response(owner, repo, branch, commit_sha, repo_state_result, build_result):
    response = {}
    response["owner"] = owner
    response["repository"] = repo
    response["branch"] = branch
    response["commit_sha"] = commit_sha
    download_url = "https://" + owner + repo + "/archive/" + commit_sha + ".zip"
    response["source_url"] = download_url
    response["jars"] = repo_state_result["jars"]
    response["java_files"] = repo_state_result["java_files"]
    response["build_type"] = repo_state_result["build_type"]
    response["compiled_url"] = commit_sha + ".zip"
    response["class_files"] = repo_state_result["class_files"]
    key = "dir_0/" + owner + "##" + repo
    response["success"] = build_result[key]["success"]
    response["has_own_build"] = build_result[key]["has_own_build"]
    response["compiled_dir_path"] = build_result[key]["file"]
    response["total_compilation_time"] = compute_compilation_time(build_result[key])
    response["total_processing_time"] = compute_processing_time(build_result[key])
    return response


def compute_compilation_time(build_status_map):
    if build_status_map["success"]:
        timing = list(reversed(build_status_map["timing"]))
        time_json = transform_to_json(timing)
        compilation_time = time_json["end_all_compile"] - time_json["start_build"]
        return compilation_time
    else:
        return 0


def compute_processing_time(build_status_map):
    timing = build_status_map["timing"]
    total_process_time = timing[len(timing) - 1][1] - timing[0][1]
    return total_process_time


def transform_to_json(timing):
    time_json = {}
    for ti in timing:
        time_json[ti[0]] = ti[1]
    return time_json


def download_and_save_a_repository(download_url, saved_file_path):
    if not os.path.exists(saved_file_path):
        response = requests.get(download_url)
        if response.status_code == 404:
            print("Try main branch")
            download_url = download_url.replace("master", "main")
            response = requests.get(download_url)
            if response.status_code == 404:
                print("Cannot find the main branch of ")
                return
        print("Downloading...")
        with open(saved_file_path, "wb+") as f:
            f.write(response.content)
    else:
        print("Already Downloaded")


# def prepared_downloaded_repo_name(git_url):
#     base = "https://github.com/"
#     owner_repo = git_url.split(base)[1]
#     owner = owner_repo.split("/")[0]
#     repo = owner_repo.split("/")[1]
#     return owner + "##" + repo


def execute_jbf():
    print("Executing JBF...")
    try:
        output = run(["../venv/bin/python3", "compile-p3.py"], encoding='utf8', check=True,
                     stdout=PIPE).stdout.strip()
        print(output)
        print("JBF Execution Done.")
    except CalledProcessError:
        print("Cannot execute JBF")


def clean_up_jbf_generated_files():
    print("Cleaning Up...")
    try:
        output = run(["rm", "-rf", "TBUILD", "Uncompress", "fqn_to_jar.log", "badjars_*", "save_*"], encoding='utf8',
                     check=True, stdout=PIPE).stdout.strip()
        print("Cleaning Done.")
    except CalledProcessError:
        print("Cleaning Interrupted")


def clean_up_compiled_dir():
    print("Cleaning Up COMPILED...")
    try:
        output_1 = run(["rm", "-rf", "./COMPILED/dir_0"], encoding='utf8', check=True, stdout=PIPE).stdout.strip()
        output_2 = run(["rm", "-rf", "./COMPILED/project_details.json"], encoding='utf8', check=True,
                       stdout=PIPE).stdout.strip()
        print("Cleaning COMPILED Done.")
    except CalledProcessError:
        print("Cleaning COMPILED Interrupted")


def clean_up_downloaded_project_dir(downloaded_zip_file):
    print("Cleaning Up downloaded projects.")
    try:
        output = run(["rm", "-rf", downloaded_zip_file], encoding='utf8', check=True, stdout=PIPE).stdout.strip()
        print("Cleaning downloaded projects Done.")
    except CalledProcessError:
        print("Cleaning downloaded projects Interrupted")


def archive_compiled_project(zip_file_name):
    print("Archiving Started")
    try:
        create_zip(zip_file_name, "./COMPILED")
        print("Archiving Done.")
    except CalledProcessError:
        print("Archiving Interrupted")


def create_zip(zip_file_name, dir_path):
    zf = zipfile.ZipFile(zip_file_name, "w")
    for dirname, subdirs, files in os.walk(dir_path):
        zf.write(dirname)
        for filename in files:
            zf.write(os.path.join(dirname, filename))
    zf.close()


def move_to_archive(zip_file_name, moved_path):
    print("Moving To ARCHIVE")
    try:
        output = run(["mv", zip_file_name, moved_path], encoding='utf8', check=True, stdout=PIPE).stdout.strip()
        print("Moving ARCHIVE Done")
    except CalledProcessError:
        print("Moving Interrupted")


def load_json(file):
    with open(file, 'r') as j:
        contents = json.loads(j.read())
        return contents


def make_tree(path):
    tree = dict(name=os.path.basename(path), children=[])
    try:
        lst = os.listdir(path)
    except OSError:
        pass  # ignore errors
    else:
        for name in lst:
            fn = os.path.join(path, name)
            if os.path.isdir(fn):
                tree['children'].append(make_tree(fn))
            else:
                tree['children'].append(dict(name=name))
    return tree


if __name__ == '__main__':
    app.run()
    # app.run(host='0.0.0.0', port=5000)
    # http://127.0.0.1:5000/project?url=https://github.com/0-8-4/MyJavaProject&commit_sha=5f6a3d1d9ec187a09ed27e9e71e266d287db3ec4
    # http://127.0.0.1:5000/project?url=https://github.com/tejasbhangale/OnlineBankingSystem&commit_sha=70a4df9ec73fa2ad072f03ced57cb5dcb4cf1241
