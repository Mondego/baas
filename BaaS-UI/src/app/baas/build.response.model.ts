export class BuildResponse {
  id?: string;
  branch: string;
  build_type: string;
  class_files: number;
  commit_sha: string;
  compiled_dir_path: string;
  compiled_url: string;
  has_own_build: boolean;
  jars: number;
  java_files: number;
  owner: string;
  repository: string;
  source_url: string;
  success: boolean;
  total_compilation_time: number;
  total_processing_time: number;
}
