import os, sys
import simplejson as json

projects = [line[:-4] for line in open(sys.argv[2]).read().split("\n") if line] if len(sys.argv) == 3 else [
    os.path.join(f1, f2) for f1 in os.listdir(sys.argv[1]) for f2 in os.listdir(os.path.join(sys.argv[1], f1))]
# print projects
pd = dict((line, json.load(open(os.path.join(sys.argv[1], line, "build-result.json")))) for line in projects if
          os.path.exists(os.path.join(sys.argv[1], line, "build-result.json")))
print("Success: ", len([pid for pid in pd if pd[pid]["success"]]))
print("Fails: ", len([pid for pid in pd if not pd[pid]["success"]]))
print("Total done: ", len(pd))
print("Total left: ", len(projects) - len(pd))
print("Percent complete: ", float(len(pd)) * 100 / float(len(projects)))
print("Android project count: ", len([pid for pid in pd if "was_android" in pd[pid] and pd[pid]["was_android"]]))
print("Android success count: ", len(
    [pid for pid in pd if "was_android" in pd[pid] and pd[pid]["was_android"] and pd[pid]["success"]]))
print("Own Builds project count: ", len([pid for pid in pd if "has_own_build" in pd[pid] and pd[pid]["has_own_build"]]))
print("Own Builds success count: ", len(
    [pid for pid in pd if "has_own_build" in pd[pid] and pd[pid]["has_own_build"] and pd[pid]["success"]]))
print("Own non-android Builds project count: ", len([pid for pid in pd if "has_own_build" in pd[pid] and pd[pid][
    "has_own_build"] and "was_android" in pd[pid] and pd[pid]["was_android"]]))
print("Own non-android Builds success count: ", len([pid for pid in pd if "has_own_build" in pd[pid] and pd[pid][
    "has_own_build"] and "was_android" in pd[pid] and pd[pid]["was_android"] and pd[pid]["success"]]))
print("own ant project count: ", len([pid for pid in pd if
                                      "has_own_build" in pd[pid] and pd[pid]["has_own_build"] and
                                      pd[pid]["use_command"][
                                          0] == "ant"]))
print("own ant success count: ", len([pid for pid in pd if
                                      "has_own_build" in pd[pid] and pd[pid]["has_own_build"] and
                                      pd[pid]["use_command"][
                                          0] == "ant" and pd[pid]["success"]]))
print("own mvn project count: ", len([pid for pid in pd if
                                      "has_own_build" in pd[pid] and pd[pid]["has_own_build"] and
                                      pd[pid]["use_command"][
                                          0] == "mvn"]))
print("own mvn success count: ", len([pid for pid in pd if
                                      "has_own_build" in pd[pid] and pd[pid]["has_own_build"] and
                                      pd[pid]["use_command"][
                                          0] == "mvn" and pd[pid]["success"]]))
print("own gradle project count: ", len([pid for pid in pd if
                                         "has_own_build" in pd[pid] and pd[pid]["has_own_build"] and
                                         pd[pid]["use_command"][
                                             0] == "gradle"]))
print("own gradle success count: ", len([pid for pid in pd if
                                         "has_own_build" in pd[pid] and pd[pid]["has_own_build"] and
                                         pd[pid]["use_command"][
                                             0] == "gradle" and pd[pid]["success"]]))
