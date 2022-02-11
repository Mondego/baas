import os
import zipfile
from subprocess import check_output, call, CalledProcessError


def unzip_repository(zip_path, unzip_path):
    try:
        with zipfile.ZipFile(zip_path) as zip_ref:
            zip_ref.extractall(unzip_path)
            zip_ref.close()
            check_output(["chmod", "777", unzip_path], encoding='utf8')
            print('SUCCESS Unzipping Done -', zip_path)
            return True
    except Exception as e:
        print('FAILURE -', zip_path, e)
        return False


def get_build_system_type(dir_path):
    ant_find = check_output(["find", dir_path, "-name", "build.xml"], encoding='utf8')
    if ant_find != "":
        return "ant"
    mvn_find = check_output(["find", dir_path, "-name", "pom.xml"], encoding='utf8')
    if mvn_find != "":
        return "maven"
    gradle_find = check_output(["find", dir_path, "-name", "build.gradle"], encoding='utf8')
    if gradle_find != "":
        return "gradle"
    android_find = check_output(["find", dir_path, "-name", "AndroidManifest.xml"], encoding='utf8')
    if android_find != "":
        return "android"
    return "none"


def count_jar_files(dir_path):
    var = check_output(["find", dir_path, "-name", "*.jar"], encoding='utf8')
    if var != "":
        return len(var.strip().split("\n"))
    return 0


def count_java_files(dir_path):
    var = check_output(["find", dir_path, "-name", "*.java"], encoding='utf8')
    if var != "":
        return len(var.strip().split("\n"))
    return 0


def clean_unzip_dir(folder):
    check_output(["rm", "-rf", folder], encoding='utf8')
    print("Cleaning up..." + folder)


def get_computed_metrics(unzip_path):
    repo = {}
    repo["jars"] = count_jar_files(unzip_path)
    repo["java_files"] = count_java_files(unzip_path)
    repo["build_type"] = get_build_system_type(unzip_path)
    return repo


def count_class_files(compiled_dir_path):
    try:
        var = check_output(["find", compiled_dir_path, "-name", "*.class"], encoding='utf8')
        if var != "":
            return len(var.strip().split("\n"))
    except CalledProcessError as e:
        print("Error found")
        print(str(e))
        return 0


def compute_metric_in_a_repo(zip_paths, unzip_path):
    repo = {}
    try:
        if unzip_repository(zip_paths, unzip_path):
            repo = get_computed_metrics(unzip_path)
            clean_unzip_dir(unzip_path)
            return repo
    except CalledProcessError as e:
        print("Error found for repo: " + zip_paths)
        print(str(e))
        clean_unzip_dir(unzip_path)
        return repo
    except Exception as e:
        print("Error found for repo: " + zip_paths)
        print(str(e))
        clean_unzip_dir(unzip_path)
        return repo
